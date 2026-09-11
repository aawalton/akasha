import { readdirSync } from "node:fs"
import { join, relative } from "node:path"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  answering,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  buildGuiSessionProbeScript,
  decideGuiSession,
} from "akasha/infrastructure/inference/pool/gui-session/gui-session.module.code.ts"
import { getHost } from "akasha/infrastructure/inference/pool/inference-hosts/inference-hosts.module.code.ts"
import {
  serviceDir,
  TRAFFIC_COP_SERVICE_NAME,
} from "akasha/infrastructure/inference/pool/inference-naming/inference-naming.module.code.ts"
import type { ActualResource } from "akasha/infrastructure/inference/pool/inference-schema/inference-schema.module.code.ts"
import {
  runSsh,
  runSshCapture,
  syncDir,
} from "akasha/infrastructure/inference/pool/inference-ssh/inference-ssh.module.code.ts"
import { computeInputsHash } from "akasha/infrastructure/inference/pool/inputs-hash/inputs-hash.module.code.ts"
import {
  buildPoolConfig,
  buildWritePoolConfigScript,
  foldPoolConfigHash,
  serializePoolConfig,
} from "akasha/infrastructure/inference/pool/pool-config-build/pool-config-build.module.code.ts"
import {
  buildApplyScript,
  buildPruneScript,
  buildQueryScript,
  parseActualState,
} from "akasha/infrastructure/inference/pool/provision-script/provision-script.module.code.ts"
import { foldServiceManifest } from "akasha/infrastructure/inference/pool/service-hash/service-hash.module.code.ts"
import {
  everyInference,
  type Inference,
  readFor,
} from "akasha/infrastructure/services/inferences/inference-reading/inference-reading.module.code.ts"

const HEALTH_PROBED = "image-gen"

export function sourceFileSet(workspace: string, sourceDir: string): readonly string[] {
  return readdirSync(join(workspace, sourceDir), { recursive: true, withFileTypes: true })
    .filter((one) => one.isFile())
    .map((one) => relative(workspace, join(one.parentPath, one.name)))
    .sort()
}

export function reasonFor(held: ActualResource | undefined): string {
  if (held === undefined || !held.dirPresent) return "the host holds none of it"
  if (held.condaEnvPresent && !held.condaEnvHealthy) return "the environment on the host is broken"
  return "what the host holds is stale or half there"
}

export function currentAlready(held: ActualResource | undefined, inputsHash: string): boolean {
  return (
    held?.dirPresent === true &&
    held.condaEnvPresent &&
    held.condaEnvHealthy &&
    held.launchdLoaded &&
    held.inputsHash === inputsHash
  )
}

function probedFor(name: string): readonly string[] {
  return name === HEALTH_PROBED || name.startsWith(`${HEALTH_PROBED}-`) ? [name] : []
}

async function hashFor(
  codeAt: string,
  service: Inference,
  poolJson: string | null
): Promise<string> {
  const manifest = foldServiceManifest(
    await computeInputsHash({
      workspace: codeAt,
      graphFileSet: sourceFileSet(codeAt, service.sourceDir),
    }),
    { command: [service.runs], port: service.port, workdir: service.workdir }
  )
  return service.name === TRAFFIC_COP_SERVICE_NAME && poolJson !== null
    ? foldPoolConfigHash(manifest, poolJson)
    : manifest
}

export function putUpInferenceService(
  root: string,
  slug: string,
  dryRun: boolean,
  codeAt: string
): Promise<Answer> {
  return answering(async () => {
    const one = readFor(root, slug)
    if ("refused" in one) return refusedBy([one.refused])
    const service = one.services[0] as Inference
    const every = everyInference(root)
    if ("refused" in every) return refusedBy([every.refused])

    const host = getHost(service.host)
    const target = { user: host.user, host: host.address, keyPath: host.keyPath }
    const report = [`${service.name} on ${host.name} (${host.address})`]

    if (!service.enabled) {
      report.push("is not to be running, so it is torn off the host")
      if (dryRun) return told(report)
      await runSsh(target, buildPruneScript({ host, name: service.name }))
      report.push(`tore ${service.name} down`)
      return told(report)
    }

    const running = every.services.filter((each) => each.enabled)
    const cop = running.find((each) => each.name === TRAFFIC_COP_SERVICE_NAME)
    const poolJson =
      cop === undefined ? null : serializePoolConfig(buildPoolConfig(running, cop.port))
    const inputsHash = await hashFor(codeAt, service, poolJson)
    report.push(`is asked for at hash ${inputsHash}`)

    const actual = parseActualState(
      await runSshCapture(target, buildQueryScript(host, probedFor(service.name)))
    )
    const held = actual.find((each) => each.name === service.name)
    if (currentAlready(held, inputsHash)) {
      report.push("holds that hash already, so nothing is applied")
      return told(report)
    }
    report.push(`is applied because ${reasonFor(held)}`)
    if (dryRun) return told(report)

    const verdict = decideGuiSession(await runSshCapture(target, buildGuiSessionProbeScript()))
    if (!verdict.sessionPresent) {
      throw new OperationalError(
        `no GUI session on ${host.name} (${host.address}): log in (or enable auto-login), then apply again`
      )
    }

    if (cop !== undefined) {
      await runSsh(
        target,
        buildWritePoolConfigScript({
          host,
          services: running,
          copName: cop.name,
          adminPort: cop.port,
        })
      )
    }
    await syncDir({
      target,
      localDir: join(codeAt, service.sourceDir),
      remoteDir: `${serviceDir(host.home, service.name)}/src`,
    })
    await runSsh(
      target,
      buildApplyScript({
        host,
        service: {
          name: service.name,
          pythonVersion: service.pythonVersion,
          sourceDir: service.sourceDir,
          workdir: service.workdir,
          runs: service.runs,
          lifecycle: service.lifecycle,
        },
        inputsHash,
      })
    )
    report.push(`applied ${service.name}`)
    return told(report)
  })
}
