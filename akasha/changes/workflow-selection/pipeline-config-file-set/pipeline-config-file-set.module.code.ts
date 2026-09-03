import { awaitSpawnWithTimeout } from "@akasha/utils-run/spawn-ceiling"
import type { CommitSha40 } from "@akasha/workflow-language/ci-identifiers"

export const LS_TREE_CEILING_MS = 60_000

export async function listCommitTreePaths(
  gitDir: string,
  sha: CommitSha40
): Promise<readonly string[]> {
  const lsTree = Bun.spawn(["git", "-C", gitDir, "ls-tree", "-r", "--name-only", "-z", sha], {
    stdout: "pipe",
    stderr: "pipe",
  })
  const [stdout, stderr, exit] = await Promise.all([
    new Response(lsTree.stdout).text(),
    new Response(lsTree.stderr).text(),
    awaitSpawnWithTimeout(lsTree, `git ls-tree ${sha} in ${gitDir}`, LS_TREE_CEILING_MS),
  ])
  if (exit !== 0) {
    throw new Error(`git ls-tree ${sha} failed (exit ${exit}): ${stderr.trim()}`)
  }
  return stdout.split("\0").filter((p) => p.length > 0)
}

export function intersectWithTreePaths(
  seedFiles: readonly string[],
  treePaths: ReadonlySet<string>
): readonly string[] {
  return seedFiles.filter((p) => treePaths.has(p)).sort()
}
