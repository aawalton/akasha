import { existsSync } from "node:fs"
import { chmod, copyFile, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { cluster as clusterArgument } from "akasha/commands/arguments/pages/cluster.argument.ts"
import { ip as ipArgument } from "akasha/commands/arguments/pages/ip.argument.ts"
import { node as nodeArgument } from "akasha/commands/arguments/pages/node.argument.ts"
import { answering, told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { talosApply as page } from "akasha/commands/pages/talos/apply/talos-apply.command.ts"
import {
  emitDocumentsYaml,
  emitPatchYaml,
  emitSchematicYaml,
} from "akasha/infrastructure/cluster/provisioning/talos/emit-yaml/emit-yaml.module.code.ts"
import { registerSchematic } from "akasha/infrastructure/cluster/provisioning/talos/factory/factory.module.code.ts"
import { buildNodePatch } from "akasha/infrastructure/cluster/provisioning/talos/modules/build-patch/build-patch.module.code.ts"
import { buildSchematic } from "akasha/infrastructure/cluster/provisioning/talos/modules/build-schematic/build-schematic.module.code.ts"
import { buildNodeVolumes } from "akasha/infrastructure/cluster/provisioning/talos/modules/build-volumes/build-volumes.module.code.ts"
import {
  getCluster,
  getNode,
} from "akasha/infrastructure/cluster/provisioning/talos/nodes/nodes.module.code.ts"
import {
  clusterSecretsSopsPath,
  clusterTalosconfigPath,
} from "akasha/infrastructure/cluster/provisioning/talos/paths/paths.module.code.ts"
import { readRegistryCa } from "akasha/infrastructure/cluster/provisioning/talos/registry-ca/registry-ca.module.code.ts"
import type {
  ClusterIntent,
  NodeIntent,
} from "akasha/infrastructure/cluster/provisioning/talos/schema/schema.module.code.ts"
import { decryptToTmp } from "akasha/infrastructure/cluster/provisioning/talos/sops/sops.module.code.ts"
import { runTalosctl } from "akasha/infrastructure/cluster/provisioning/talos/talosctl/talosctl.module.code.ts"
import { SCRATCH_AT } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const CONTROL_PLANE = "controlplane"

const WORKER = "worker"

export type Named = {
  readonly node: string
  readonly ip: string
  readonly cluster?: string
}

export type Registering = (yaml: string) => Promise<string>

export type Running = (call: { readonly args: readonly string[] }) => Promise<unknown>

export type Keeping = (workDir: string, cluster: string) => Promise<string>

async function keptTalosconfig(workDir: string, cluster: string): Promise<string> {
  const persisted = clusterTalosconfigPath(cluster)
  await mkdir(dirname(persisted), { recursive: true, mode: 0o700 })
  await copyFile(join(workDir, "talosconfig"), persisted)
  await chmod(persisted, 0o600)
  return persisted
}

export type Applied = {
  readonly cluster: string
  readonly node: string
  readonly file: string
  readonly ip: string
  readonly workDir: string
  readonly gen: readonly string[]
  readonly apply: readonly string[]
}

export function tookSaid(applied: Applied): string {
  return (
    `${applied.node} took ${applied.file} at ${applied.ip}, ` +
    "and that node is no longer running what it ran before"
  )
}

export async function wroteConfig(
  applied: Applied,
  running: Running,
  keeping: Keeping,
  done: string[]
): Promise<undefined> {
  await running({ args: applied.gen })
  const persisted = await keeping(applied.workDir, applied.cluster)
  done.push(`wrote the talosconfig to ${persisted}`)
  await running({ args: applied.apply })
  done.push(tookSaid(applied))
  return undefined
}

async function applying(
  read: Named,
  given: Given,
  registering: Registering,
  running: Running,
  keeping: Keeping,
  done: string[]
): Promise<Answer> {
  let node: NodeIntent
  let cluster: ClusterIntent
  let name: string
  try {
    node = getNode(read.node)
    name = read.cluster ?? node.cluster
    cluster = getCluster(name)
  } catch (thrown) {
    return mistaking([whyOf(thrown)])
  }

  const secretsPath = clusterSecretsSopsPath(name)
  if (!existsSync(secretsPath)) {
    return mistaking([
      `no cluster secrets are at ${secretsPath}`,
      `\`${given.calledAs} talos secret-gen ${clusterArgument.said} ${name}\` writes them, and an apply reads them`,
    ])
  }

  const schematicId = await registering(emitSchematicYaml(buildSchematic(node)))
  done.push(`schematic id: ${schematicId}`)

  const registryCa = cluster.registryHosts.length > 0 ? readRegistryCa() : undefined
  const patchYaml = emitPatchYaml(buildNodePatch(node, cluster, schematicId, { registryCa }))
  const workDir = await mkdtemp(join(SCRATCH_AT, `talos-apply-${node.id}-`))
  const patchPath = join(workDir, "patch.yaml")
  await writeFile(patchPath, patchYaml)

  const volumesYaml = emitDocumentsYaml(buildNodeVolumes(node))
  const volumesPatch: string[] = []
  if (volumesYaml.length > 0) {
    const volumesPath = join(workDir, "volumes.yaml")
    await writeFile(volumesPath, volumesYaml)
    volumesPatch.push("--config-patch", `@${volumesPath}`)
  }

  const machineType = node.role === WORKER ? WORKER : CONTROL_PLANE
  const appliedFile = `${machineType}.yaml`
  const endpoint =
    cluster.controlPlaneVip !== undefined
      ? `https://${cluster.controlPlaneVip}:6443`
      : `https://${read.ip}:6443`

  let decrypted: string | undefined
  try {
    decrypted = await decryptToTmp(secretsPath)
    await wroteConfig(
      {
        cluster: name,
        node: node.id,
        file: appliedFile,
        ip: read.ip,
        workDir,
        gen: [
          "gen",
          "config",
          name,
          endpoint,
          "--with-secrets",
          decrypted,
          "--config-patch",
          `@${patchPath}`,
          ...volumesPatch,
          "--output-types",
          `${machineType},talosconfig`,
          "--output",
          workDir,
          "--force",
        ],
        apply: [
          "apply-config",
          "--insecure",
          "--nodes",
          read.ip,
          "--file",
          join(workDir, appliedFile),
        ],
      },
      running,
      keeping,
      done
    )
  } finally {
    if (decrypted !== undefined) await rm(dirname(decrypted), { recursive: true, force: true })
    await rm(workDir, { recursive: true, force: true })
  }
  return told(done)
}

export async function talosApply(
  argv: readonly string[],
  given: Given,
  registering: Registering = registerSchematic,
  running: Running = runTalosctl,
  keeping: Keeping = keptTalosconfig
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [nodeArgument, clusterArgument, ipArgument])
  if ("refused" in read) return mistaking(read.refused)
  return await answering(async (done) =>
    applying(read.taken, given, registering, running, keeping, done)
  )
}
