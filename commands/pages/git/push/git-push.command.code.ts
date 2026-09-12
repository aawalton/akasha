import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { dryRun } from "akasha/commands/arguments/pages/dry-run.argument.ts"
import {
  INPUT,
  OPERATIONAL,
  refused,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { gitPush as page } from "akasha/commands/pages/git/push/git-push.command.ts"
import { git } from "akasha/git/capping/git-capping.module.code.ts"
import { pushBranch, remoteOf } from "akasha/git/pushing/git-pushing.module.code.ts"

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

export function gitPush(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [dryRun])
  if ("refused" in read) return refusedBy(read.refused, INPUT)
  const root = given.root
  const remote = remoteOf(root)
  if (remote === null) {
    return refused(
      "no remote is named in this checkout, so there is nowhere to carry the branch",
      OPERATIONAL
    )
  }
  const branch = branchIn(root)
  if (branch === null) {
    return refused("HEAD is on no branch, so there is no branch to carry", OPERATIONAL)
  }
  if (read.taken.dryRun) {
    return told([`${aheadIn(root, remote, branch)} would be carried to ${remote} (${branch})`])
  }
  const outcome = pushBranch(root)
  if (outcome.failed) return refused(outcome.line, OPERATIONAL)
  return told([outcome.line])
}
