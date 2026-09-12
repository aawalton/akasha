import { writeFile } from "node:fs/promises"
import { resolve } from "node:path"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { download } from "akasha/commands/arguments/pages/download.argument.ts"
import { node as nodeArgument } from "akasha/commands/arguments/pages/node.argument.ts"
import {
  answeredWith,
  answering,
  naming,
  OPERATIONAL,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { talosImageBuild as page } from "akasha/commands/pages/talos/image-build/talos-image-build.command.ts"
import { buildSchematic } from "akasha/infrastructure/cluster/provisioning/talos/build-schematic/build-schematic.module.code.ts"
import { emitSchematicYaml } from "akasha/infrastructure/cluster/provisioning/talos/emit-yaml/emit-yaml.module.code.ts"
import {
  installerIsoUrl,
  registerSchematic,
} from "akasha/infrastructure/cluster/provisioning/talos/factory/factory.module.code.ts"
import {
  getClusterForNode,
  getNode,
} from "akasha/infrastructure/cluster/provisioning/talos/nodes/nodes.module.code.ts"
import type {
  ClusterIntent,
  NodeIntent,
} from "akasha/infrastructure/cluster/provisioning/talos/schema/schema.module.code.ts"

export type Named = { readonly node: string; readonly download?: string }

export async function fetched(
  url: string
): Promise<{ readonly bytes: Uint8Array } | { readonly refused: string }> {
  let answer: Response
  try {
    answer = await fetch(url)
  } catch (thrown) {
    return { refused: `${url} would not be fetched: ${whyOf(thrown)}` }
  }
  if (!answer.ok) return { refused: `the installer ISO fetch answered ${answer.status}` }
  return { bytes: new Uint8Array(await answer.arrayBuffer()) }
}

export type Fetching = typeof fetched

export type Registering = (yaml: string) => Promise<string>

export type Writing = (at: string, bytes: Uint8Array) => Promise<void>

export function schematicSaid(id: string): string {
  return `schematic id: ${id}`
}

export function isoSaid(at: string): string {
  return `wrote ${at}`
}

export async function registeredSchematic(
  yaml: string,
  registering: Registering,
  done: string[]
): Promise<string> {
  const id = await registering(yaml)
  done.push(schematicSaid(id))
  return id
}

export async function wroteIso(
  at: string,
  bytes: Uint8Array,
  writing: Writing,
  done: string[]
): Promise<undefined> {
  await writing(at, bytes)
  done.push(isoSaid(at))
  return undefined
}

async function building(
  read: Named,
  given: Given,
  registering: Registering,
  writing: Writing,
  fetching: Fetching,
  done: string[]
): Promise<Answer> {
  let node: NodeIntent
  let cluster: ClusterIntent
  try {
    node = getNode(read.node)
    cluster = getClusterForNode(read.node)
  } catch (thrown) {
    return mistaking([whyOf(thrown)])
  }
  const id = await registeredSchematic(emitSchematicYaml(buildSchematic(node)), registering, done)
  const isoUrl = installerIsoUrl(id, cluster.talosVersion)
  done.push(`installer iso: ${isoUrl}`)
  if (read.download === undefined) return told(done)
  const got = await fetching(isoUrl)
  if ("refused" in got) return answeredWith(done, [got.refused], OPERATIONAL)
  await wroteIso(resolve(given.root, read.download), got.bytes, writing, done)
  return told(done)
}

export async function talosImageBuild(
  argv: readonly string[],
  given: Given,
  registering: Registering = registerSchematic,
  writing: Writing = writeFile,
  fetching: Fetching = fetched
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [nodeArgument, download])
  if ("refused" in read) return mistaking(read.refused)
  return await answering(async (done) =>
    naming(done, await building(read.taken, given, registering, writing, fetching, done))
  )
}
