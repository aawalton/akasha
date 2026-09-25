import { existsSync } from "node:fs"
import { mkdir } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { cluster as clusterArgument } from "akasha/command/argument/pages/cluster.argument.ts"
import { ip as ipArgument } from "akasha/command/argument/pages/ip.argument.ts"
import { output as outputArgument } from "akasha/command/argument/pages/output.argument.ts"
import { answering, told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { talosKubeconfig as page } from "akasha/command/pages/talos/kubeconfig/talos-kubeconfig.command.ts"
import {
  clusterKubeconfigPath,
  clusterTalosconfigPath,
} from "akasha/infrastructure/cluster/provisioning/talos/modules/paths/paths.module.code.ts"
import { runTalosctl } from "akasha/infrastructure/cluster/provisioning/talos/modules/talosctl/talosctl.module.code.ts"

export type Named = {
  readonly ip: string
  readonly cluster: string
  readonly output?: string
}

export function madeSaid(folder: string): string {
  return `the folder ${folder} was not there before this, and this made it`
}

type Fetching = (done: string[], read: Named, given: Given) => Promise<Answer>

async function fetched(done: string[], read: Named, given: Given): Promise<Answer> {
  const cluster = read.cluster
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
