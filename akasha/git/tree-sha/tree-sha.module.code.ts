import { runGit } from "../git-answering/git-answering.module.code.ts"

declare const TreeShaBrand: unique symbol
export type TreeSha = string & { readonly [TreeShaBrand]: "TreeSha" }

function TreeSha(value: string): TreeSha {
  return value as TreeSha
}

export async function getCommitTreeSha(workDir: string, commitSha: string): Promise<TreeSha> {
  const res = await runGit(["rev-parse", `${commitSha}^{tree}`], workDir)
  if (!res.ok) {
    throw new Error(
      `git rev-parse ${commitSha}^{tree} failed in ${workDir} (exit ${res.exitCode}): ${res.stderr}`
    )
  }
  const sha = res.stdout
  if (!/^[0-9a-f]{40}$/.test(sha)) {
    throw new Error(`git rev-parse ${commitSha}^{tree} returned non-canonical tree OID: ${sha}`)
  }
  return TreeSha(sha)
}
