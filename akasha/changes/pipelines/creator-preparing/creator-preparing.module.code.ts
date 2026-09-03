import { askingAt, graphOrigin } from "@akasha/old-graph/old-graph-asking"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { codeRoot } from "@akasha/pages-system/code-root"
import { commitSha40 } from "@akasha/workflow-language/ci-identifiers"
import { loadAllWorkflowConfigsAtShaInProcess } from "@akasha/workflow-selection/pipeline-config-sha-pinned"
import { CREATOR_SCRATCH_ROOT } from "@akasha/workflow-selection/sha-pinned-tree"
import type {
  CreatorCode,
  GitResult,
  Graph,
  WorkflowConfigJson,
} from "../creator-code/creator-code.module.code.ts"

export const GIT_TIMEOUT_MS = 480_000

const PACKAGE_EDGE = "pkg-contains-file"

const NAMED_CAP = 5

const LOG = "main-pipeline-creator:"

export interface Prepared {
  readonly branch: string
  readonly commit: string
  readonly changedFiles: readonly string[]
  readonly treeHash: string | null
  readonly configs: readonly WorkflowConfigJson[]
  readonly graph: Graph
}

export interface PrepareArgs {
  readonly branch: string
  readonly commit: string
  readonly instructionsCommit: string
  readonly lastPipelinedCommit: string | null
}

function lines(stdout: string): readonly string[] {
  return stdout
    .split("\n")
    .map((one) => one.trim())
    .filter((one) => one.length > 0)
}

function short(commit: string): string {
  return commit.slice(0, 7)
}

export async function prepareMainPipeline(
  code: CreatorCode,
  args: PrepareArgs
): Promise<Prepared | null> {
  const gitDir = codeRoot()
  const instructionsGitDir = rootFor(resolveRoots(), AKASHA)
  const git = (spelled: readonly string[]): Promise<GitResult> =>
    code.runGit(spelled, gitDir, { timeoutMs: GIT_TIMEOUT_MS })

  const { branch, commit, instructionsCommit, lastPipelinedCommit } = args

  const fetched = await git(["fetch", "origin", branch])
  if (!fetched.ok) {
    console.error(`${LOG} git fetch origin ${branch} failed (non-fatal): ${fetched.stderr.trim()}`)
  }

  if (lastPipelinedCommit !== null) {
    const covered = await git(["merge-base", "--is-ancestor", commit, lastPipelinedCommit])
    if (covered.ok) {
      console.error(
        `${LOG} covered_request_noop commit=${short(commit)} covering=${short(lastPipelinedCommit)} ` +
          `branch=${branch} — already proven pipelined, creating nothing`
      )
      return null
    }
  }

  const foldBasis = await computeFoldBasis(git, commit, lastPipelinedCommit)
  if (foldBasis === null) return null

  const diffed = await git(["diff", "--name-only", `${foldBasis}..${commit}`])
  if (!diffed.ok) {
    console.error(
      `${LOG} git diff ${short(foldBasis)}..${short(commit)} failed: ${diffed.stderr.trim()}`
    )
    return null
  }
  const changedFiles = lines(diffed.stdout)
  if (changedFiles.length === 0) {
    console.error(
      `${LOG} unexpected_empty_diff foldBasis=${short(foldBasis)} commit=${short(commit)} ` +
        `branch=${branch} — creating nothing`
    )
    return null
  }

  const treeHash = await readTreeHash(code, gitDir, commit)

  const notDeleted = await git([
    "diff",
    "--name-only",
    "--diff-filter=d",
    `${foldBasis}..${commit}`,
  ])

  const origin = graphOrigin(instructionsGitDir)
  const asked = await code.askGraph(commit, askingAt(origin))
  if (!asked.ok) {
    console.error(
      `${LOG} ${origin} did not answer the graph at ${branch}@${short(commit)}, so which ` +
        `workflows the change reaches cannot be worked out — creating nothing: ${asked.why}`
    )
    return null
  }
  const graph = asked.held

  if (graph.edges({ type: [PACKAGE_EDGE] }).length === 0) {
    throw new Error(
      `${LOG} degenerate dispatch graph — no ${PACKAGE_EDGE} edge for ` +
        `${changedFiles.length} changed file(s) at ${branch}@${short(commit)}; refusing to ` +
        "create a pipeline that would skip every package-seeded workflow"
    )
  }

  if (notDeleted.ok) {
    const missing = code.changedFilesMissingGraphNodes(graph, lines(notDeleted.stdout))
    if (missing.length > 0) {
      const overflow = missing.length > NAMED_CAP ? ` (+${missing.length - NAMED_CAP} more)` : ""
      throw new Error(
        `${LOG} partial dispatch graph — ${missing.length} changed file(s) that were not ` +
          `deleted have no graph node at ${branch}@${short(commit)}; refusing to create a ` +
          `pipeline that would over-dispatch. Missing: ${missing.slice(0, NAMED_CAP).join(", ")}${overflow}`
      )
    }
  }

  const configs = await loadAllWorkflowConfigsAtShaInProcess({
    gitDir,
    sha: commitSha40(commit),
    instructionsGitDir,
    instructionsCommit: commitSha40(instructionsCommit),
    branch,
    changedFiles,
    graph,
    scratchRoot: CREATOR_SCRATCH_ROOT,
  })
  if (configs.length === 0) {
    console.error(
      `${LOG} no workflow config discovered for ${branch}@${short(commit)} — creating nothing`
    )
    return null
  }

  return { branch, commit, changedFiles, treeHash, configs, graph }
}

async function readTreeHash(
  code: CreatorCode,
  gitDir: string,
  commit: string
): Promise<string | null> {
  try {
    return await code.getCommitTreeSha(gitDir, commit)
  } catch (err) {
    console.error(`${LOG} tree hash for ${short(commit)} could not be read:`, err)
    return null
  }
}

async function computeFoldBasis(
  git: (spelled: readonly string[]) => Promise<GitResult>,
  commit: string,
  lastPipelinedCommit: string | null
): Promise<string | null> {
  const parent = await git(["rev-parse", `${commit}^`])
  const before = parent.ok ? parent.stdout.trim() : null
  if (lastPipelinedCommit === null || lastPipelinedCommit === commit) {
    if (before === null) {
      console.error(
        `${LOG} ${short(commit)} has no parent and nothing on this branch has been pipelined, ` +
          "so there is no commit to fold the diff against — creating nothing"
      )
      return null
    }
    return before
  }
  const ancestor = await git(["merge-base", "--is-ancestor", lastPipelinedCommit, commit])
  if (ancestor.ok) return lastPipelinedCommit
  return before
}
