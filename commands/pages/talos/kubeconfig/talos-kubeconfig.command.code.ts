import { existsSync } from "node:fs"
import { mkdir } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { cluster as clusterArgument } from "akasha/commands/arguments/pages/cluster.argument.ts"
import { ip as ipArgument } from "akasha/commands/arguments/pages/ip.argument.ts"
import { output as outputArgument } from "akasha/commands/arguments/pages/output.argument.ts"
import { answering, told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { talosKubeconfig as page } from "akasha/commands/pages/talos/kubeconfig/talos-kubeconfig.command.ts"
import { DEFAULT_CLUSTER_NAME } from "akasha/infrastructure/cluster/provisioning/talos/nodes/nodes.module.code.ts"
import {
  clusterKubeconfigPath,
  clusterTalosconfigPath,
} from "akasha/infrastructure/cluster/provisioning/talos/paths/paths.module.code.ts"
import { runTalosctl } from "akasha/infrastructure/cluster/provisioning/talos/talosctl/talosctl.module.code.ts"

export type Named = {
  readonly ip: string
  readonly cluster?: string
  readonly output?: string
}

export function madeSaid(folder: string): string {
  return `the folder ${folder} was not there before this, and this made it`
}

export type Fetching = (done: string[], read: Named, given: Given) => Promise<Answer>

async function fetched(done: string[], read: Named, given: Given): Promise<Answer> {
  const cluster = read.cluster ?? DEFAULT_CLUSTER_NAME
  const talosconfig = clusterTalosconfigPath(cluster)
  if (!existsSync(talosconfig)) {
    return mistaking([
      `no talosconfig is at ${talosconfig}`,
      `\`${given.calledAs} talos apply --node <id> ${ipArgument.said} ${read.ip}\` writes it, and this reads it`,
    ])
  }
  const output =
    read.output === undefined ? clusterKubeconfigPath(cluster) : resolve(given.root, read.output)
  const made = await mkdir(dirname(output), { recursive: true })
  if (made !== undefined) done.push(madeSaid(made))
  await runTalosctl({
    args: [
      "--talosconfig",
      talosconfig,
      "kubeconfig",
      "--nodes",
      read.ip,
      "--endpoints",
      read.ip,
      "--force",
      output,
    ],
  })
  return told([`wrote ${output}`])
}

export async function fetchedBy(
  read: Named,
  given: Given,
  fetching: Fetching = fetched
): Promise<Answer> {
  return await answering(async (done) => await fetching(done, read, given))
}

export async function talosKubeconfig(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [clusterArgument, ipArgument, outputArgument])
  if ("refused" in read) return mistaking(read.refused)
  return await fetchedBy(read.taken, given)
}
