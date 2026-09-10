import { git } from "akasha/git/git-capping/git-capping.module.code.ts"
import { pushBranch, remoteOf } from "akasha/git/git-pushing/git-pushing.module.code.ts"
import { type Answer, type Given, refused } from "../../modules/calling/calling.module.code.ts"

const DRY_RUN = "--dry-run"

const MISTOOK = 1

export function branchIn(root: string): string | null {
  const head = git(root, ["symbolic-ref", "--short", "HEAD"])
  if (head.code !== 0 || head.stdout === "") return null
  return head.stdout
}

export function aheadIn(root: string, remote: string, branch: string): string {
  const counted = git(root, ["rev-list", "--count", `refs/remotes/${remote}/${branch}..HEAD`])
  if (counted.code !== 0 || counted.stdout === "") return "an unknown number of commits"
  return counted.stdout === "1" ? "1 commit" : `${counted.stdout} commits`
}

export function push(argv: readonly string[], given: Given): Answer {
  const dry = argv.length === 1 && argv[0] === DRY_RUN
  if (argv.length > 0 && !dry) {
    return refused(
      `\`${argv.join(" ")}\` is not an argument this takes — this command takes \`${DRY_RUN}\` alone`,
      MISTOOK
    )
  }
  const root = given.root
  const remote = remoteOf(root)
  if (remote === null) {
    return refused(
      "no remote is named in this checkout, so there is nowhere to carry the branch",
      MISTOOK
    )
  }
  const branch = branchIn(root)
  if (branch === null) {
    return refused("HEAD is on no branch, so there is no branch to carry", MISTOOK)
  }
  if (dry) {
    return {
      report: [`${aheadIn(root, remote, branch)} would be carried to ${remote} (${branch})`],
      refusals: [],
      code: 0,
    }
  }
  const outcome = pushBranch(root)
  if (outcome.failed) return refused(outcome.line, MISTOOK)
  return { report: [outcome.line], refusals: [], code: 0 }
}
