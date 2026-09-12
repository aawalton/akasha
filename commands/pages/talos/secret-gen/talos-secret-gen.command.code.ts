import { existsSync } from "node:fs"
import { mkdir, mkdtemp, rm, stat } from "node:fs/promises"
import { dirname, join } from "node:path"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { cluster } from "akasha/commands/arguments/pages/cluster.argument.ts"
import { force } from "akasha/commands/arguments/pages/force.argument.ts"
import {
  answering,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { talosSecretGen as page } from "akasha/commands/pages/talos/secret-gen/talos-secret-gen.command.ts"
import { clusterSecretsSopsPath } from "akasha/infrastructure/cluster/provisioning/talos/paths/paths.module.code.ts"
import { encryptFile } from "akasha/infrastructure/cluster/provisioning/talos/sops/sops.module.code.ts"
import { runTalosctl } from "akasha/infrastructure/cluster/provisioning/talos/talosctl/talosctl.module.code.ts"
import { SCRATCH_AT } from "akasha/utils/fs/scratching/scratching.module.code.ts"

export type Named = { readonly cluster: string; readonly force: boolean }

export type Generating = (done: string[], read: Named) => Promise<Answer>

async function generated(done: string[], read: Named): Promise<Answer> {
  const destPath = clusterSecretsSopsPath(read.cluster)
  if (existsSync(destPath) && !read.force) {
    return mistaking([
      `a secrets file is already at ${destPath}`,
      `writing it again loses every node's PKI, so \`${force.said}\` is what says a rotation is meant`,
    ])
  }
  await mkdir(dirname(destPath), { recursive: true })
  const workDir = await mkdtemp(join(SCRATCH_AT, "talos-secrets-gen-"))
  const tmpSecretsPath = join(workDir, "secrets.yaml")
  try {
    await runTalosctl({ args: ["gen", "secrets", "-o", tmpSecretsPath, "--force"] })
    const info = await stat(tmpSecretsPath)
    if (info.size === 0) return refusedBy(["talosctl gen secrets wrote nothing"], OPERATIONAL)
    await encryptFile(tmpSecretsPath, destPath, done)
  } finally {
    await rm(workDir, { recursive: true, force: true })
  }
  return told([`wrote the SOPS-encrypted secrets to ${destPath}`])
}

export async function generatedBy(
  read: Named,
  generating: Generating = generated
): Promise<Answer> {
  return await answering(async (done) => await generating(done, read))
}

export async function talosSecretGen(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [force, cluster])
  if ("refused" in read) return mistaking(read.refused)
  return await generatedBy({ cluster: read.taken.cluster, force: read.taken.force })
}
