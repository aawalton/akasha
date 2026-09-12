import { writeFile } from "node:fs/promises"
import { resolve } from "node:path"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { node as nodeArgument } from "akasha/commands/arguments/pages/node.argument.ts"
import { output } from "akasha/commands/arguments/pages/output.argument.ts"
import {
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { lines } from "akasha/commands/modules/yaml-lines/yaml-lines.module.code.ts"
import { talosConfigGen as page } from "akasha/commands/pages/talos/config-gen/talos-config-gen.command.ts"
import { buildNodeVolumes } from "akasha/infrastructure/cluster/provisioning/talos/build-volumes/build-volumes.module.code.ts"
import { emitDocumentsYaml } from "akasha/infrastructure/cluster/provisioning/talos/emit-yaml/emit-yaml.module.code.ts"
import {
  buildNodePatch,
  PLACEHOLDER_SCHEMATIC_ID,
} from "akasha/infrastructure/cluster/provisioning/talos/modules/build-patch/build-patch.module.code.ts"
import {
  getClusterForNode,
  getNode,
} from "akasha/infrastructure/cluster/provisioning/talos/nodes/nodes.module.code.ts"
import { readRegistryCa } from "akasha/infrastructure/cluster/provisioning/talos/registry-ca/registry-ca.module.code.ts"
import type {
  ClusterIntent,
  NodeIntent,
} from "akasha/infrastructure/cluster/provisioning/talos/schema/schema.module.code.ts"
import { optionalEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"

const SCHEMATIC_ENV = "TALOS_SCHEMATIC_ID"

export type Named = { readonly node: string; readonly output?: string }

function schematicSaid(): string {
  return optionalEnv(SCHEMATIC_ENV) ?? PLACEHOLDER_SCHEMATIC_ID
}

async function writing(read: Named, given: Given): Promise<Answer> {
  let node: NodeIntent
  let cluster: ClusterIntent
  try {
    node = getNode(read.node)
    cluster = getClusterForNode(read.node)
  } catch (thrown) {
    return mistaking([whyOf(thrown)])
  }
  const registryCa = cluster.registryHosts.length > 0 ? readRegistryCa() : undefined
  const patch = buildNodePatch(node, cluster, schematicSaid(), { registryCa })
  const yaml = emitDocumentsYaml([patch, ...buildNodeVolumes(node)])
  if (read.output === undefined) return told(lines(yaml))
  const at = resolve(given.root, read.output)
  await writeFile(at, yaml)
  return told([`wrote ${at}`])
}

export async function talosConfigGen(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [nodeArgument, output])
  if ("refused" in read) return mistaking(read.refused)
  try {
    return await writing(read.taken, given)
  } catch (thrown) {
    return refusedBy([whyOf(thrown)], OPERATIONAL)
  }
}
