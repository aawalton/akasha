import { existsSync, readdirSync } from "node:fs"
import { join, relative } from "node:path"
import { OperationalError } from "@akasha/errors-core/exit-code"
import { computeInputsHash } from "@akasha/workflow-language/inputs-hash"
import {
  buildGuiSessionProbeScript,
  decideGuiSession,
} from "../gui-session/gui-session.module.code.ts"
import { getHost } from "../inference-hosts/inference-hosts.module.code.ts"
import {
  serviceDir,
  TRAFFIC_COP_SERVICE_NAME,
} from "../inference-naming/inference-naming.module.code.ts"
import {
  type ActualResource,
  ActualResourceSchema,
  type InferenceHost,
  type InferenceService,
  type ReconcilePlan,
} from "../inference-schema/inference-schema.module.code.ts"
import { MANAGED_ENVS, SERVICES } from "../inference-services/inference-services.module.code.ts"
import { runSsh, runSshCapture, syncDir } from "../inference-ssh/inference-ssh.module.code.ts"
import {
  buildPoolConfig,
  buildWritePoolConfigScript,
  foldPoolConfigHash,
  serializePoolConfig,
} from "../pool-config-build/pool-config-build.module.code.ts"
import {
  buildApplyScript,
  buildPruneScript,
  buildQueryScript,
} from "../provision-script/provision-script.module.code.ts"
import { computePlan } from "../reconcile-plan/reconcile-plan.module.code.ts"
import { foldServiceManifest } from "../service-hash/service-hash.module.code.ts"

export interface ReconcileSummary {
  readonly applied: number
  readonly skipped: number
  readonly pruned: number
}

export function findRepoRoot(start: string): string {
  let dir = start
  for (;;) {
    if (existsSync(join(dir, "bun.lock"))) return dir
    const parent = join(dir, "..")
    if (parent === dir) throw new Error(`could not find repo root (no bun.lock) above ${start}`)
    dir = parent
  }
}

function sourceFileSet(workspace: string, sourceDir: string): readonly string[] {
  const abs = join(workspace, sourceDir)
  const entries = readdirSync(abs, { recursive: true, withFileTypes: true })
  return entries
    .filter((e) => e.isFile())
    .map((e) => relative(workspace, join(e.parentPath, e.name)))
    .sort()
}

export function parseActualState(raw: string): readonly ActualResource[] {
  const acc = new Map<
    string,
    {
      dirPresent: boolean
      inputsHash: string | null
      launchdLoaded: boolean
      condaEnvPresent: boolean
      condaEnvHealthy: boolean
    }
  >()
  const ensure = (
    name: string
  ): {
    dirPresent: boolean
    inputsHash: string | null
    launchdLoaded: boolean
    condaEnvPresent: boolean
    condaEnvHealthy: boolean
  } => {
    let e = acc.get(name)
    if (e === undefined) {
      e = {
        dirPresent: false,
        inputsHash: null,
        launchdLoaded: false,
        condaEnvPresent: false,
        condaEnvHealthy: true,
      }
      acc.set(name, e)
    }
    return e
  }
  for (const line of raw.split("\n")) {
    const parts = line.trim().split(/\s+/)
    if (parts[0] === "DIR" && parts[1] !== undefined) {
      const e = ensure(parts[1])
      e.dirPresent = true
      e.inputsHash = parts[2] === undefined || parts[2] === "NONE" ? null : parts[2]
    } else if (parts[0] === "LAUNCHD" && parts[1] !== undefined) {
      ensure(parts[1]).launchdLoaded = true
    } else if (parts[0] === "CONDA" && parts[1] !== undefined) {
      ensure(parts[1]).condaEnvPresent = true
    } else if (parts[0] === "CONDABAD" && parts[1] !== undefined) {
      ensure(parts[1]).condaEnvHealthy = false
    }
  }
  return [...acc.entries()].map(([name, e]) => ActualResourceSchema.parse({ name, ...e }))
}

export function parseMfluxTools(raw: string): readonly string[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("mflux-"))
    .sort()
}

function printPlan(
  host: InferenceHost,
  plan: ReconcilePlan,
  managedEnvNames: readonly string[]
): undefined {
  process.stdout.write(`\n=== inference reconcile plan: ${host.name} (${host.address}) ===\n`)
  for (const a of plan.apply) {
    process.stdout.write(`  apply  ${a.service.name}  (${a.reason}, hash ${a.inputsHash})\n`)
  }
  for (const s of plan.skip) {
    process.stdout.write(`  skip   ${s.service.name}  (up-to-date, hash ${s.inputsHash})\n`)
  }
  for (const p of plan.prune) {
    process.stdout.write(`  prune  ${p.name}  (full teardown — not in registry)\n`)
  }
  for (const name of managedEnvNames) {
    process.stdout.write(`  keep   ${name}  (declared managed env — protected from prune)\n`)
  }
  if (plan.apply.length === 0 && plan.prune.length === 0) {
    process.stdout.write("  (no changes)\n")
  }
  process.stdout.write("\n")
}

async function reconcileHost(args: {
  workspace: string
  host: InferenceHost
  services: readonly InferenceService[]
  dryRun: boolean
}): Promise<ReconcileSummary> {
  const { workspace, host, services, dryRun } = args
  const target = { user: host.user, host: host.address, keyPath: host.keyPath }
  const healthProbeNames = services
    .filter((s) => s.name === "image-gen" || s.name.startsWith("image-gen-"))
    .map((s) => s.name)
  const actual = parseActualState(
    await runSshCapture(target, buildQueryScript(host, healthProbeNames))
  )

  const copService = services.find((s) => s.name === TRAFFIC_COP_SERVICE_NAME)
  const poolJson =
    copService === undefined
      ? null
      : serializePoolConfig(buildPoolConfig(services, copService.port))

  const desired = await Promise.all(
    services.map(async (service) => {
      const manifestHash = foldServiceManifest(
        await computeInputsHash({
          workspace,
          graphFileSet: sourceFileSet(workspace, service.sourceDir),
        }),
        service
      )
      const inputsHash =
        service.name === TRAFFIC_COP_SERVICE_NAME && poolJson !== null
          ? foldPoolConfigHash(manifestHash, poolJson)
          : manifestHash
      return { service, inputsHash }
    })
  )

  const managedEnvNames = MANAGED_ENVS.filter((e) => e.host === host.name).map((e) => e.name)

  const plan = computePlan({ desired, actual, managedEnvNames })
  printPlan(host, plan, managedEnvNames)

  if (dryRun) {
    return { applied: 0, skipped: plan.skip.length, pruned: 0 }
  }

  if (plan.apply.length > 0) {
    const verdict = decideGuiSession(await runSshCapture(target, buildGuiSessionProbeScript()))
    if (!verdict.sessionPresent) {
      throw new OperationalError(
        `no GUI session on ${host.name} (${host.address}): log in (or enable auto-login), then apply again`
      )
    }
  }

  for (const p of plan.prune) {
    process.stdout.write(`[prune] ${p.name}...\n`)
    await runSsh(target, buildPruneScript({ host, name: p.name }))
  }

  if (copService !== undefined) {
    await runSsh(
      target,
      buildWritePoolConfigScript({
        host,
        services,
        copName: copService.name,
        adminPort: copService.port,
      })
    )
  }

  for (const a of plan.apply) {
    process.stdout.write(`[apply] ${a.service.name}...\n`)
    await syncDir({
      target,
      localDir: join(workspace, a.service.sourceDir),
      remoteDir: `${serviceDir(host.home, a.service.name)}/src`,
    })
    await runSsh(target, buildApplyScript({ host, service: a.service, inputsHash: a.inputsHash }))
  }

  return { applied: plan.apply.length, skipped: plan.skip.length, pruned: plan.prune.length }
}

export async function reconcile(args: {
  workspace: string
  dryRun?: boolean
}): Promise<ReconcileSummary> {
  const byHost = new Map<string, InferenceService[]>()
  for (const service of SERVICES) {
    const list = byHost.get(service.host) ?? []
    list.push(service)
    byHost.set(service.host, list)
  }

  let applied = 0
  let skipped = 0
  let pruned = 0
  for (const [hostName, services] of byHost) {
    const summary = await reconcileHost({
      workspace: args.workspace,
      host: getHost(hostName),
      services,
      dryRun: args.dryRun ?? false,
    })
    applied += summary.applied
    skipped += summary.skipped
    pruned += summary.pruned
  }
  return { applied, skipped, pruned }
}
