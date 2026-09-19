import { isAbsolute, resolve } from "node:path"
import {
  ranAsCommandHook,
  SCOPE_FLAG,
  toldOf,
} from "akasha/agent/hook/modules/answer/hook-answer.module.code.ts"
import { judgingCalls } from "akasha/agent/hook/modules/chain-refusal/chain-refusal.module.code.ts"
import type { GitCall } from "akasha/agent/hook/modules/git-calls/git-calls.module.code.ts"
import { gitCallsIn } from "akasha/agent/hook/modules/git-calls/git-calls.module.code.ts"
import { RUNS_ANOTHER } from "akasha/agent/hook/modules/shell-calls/shell-calls.module.code.ts"
import { told } from "akasha/git/modules/running/git-running.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { canonicalize, isInside } from "akasha/page/modules/repo-path/repo-path.module.code.ts"

const HOOK = "block-git-writes"

const ELSEWHERE = [
  "In another repository, `git -C <absolute path> <act>` is let through: the path on the line",
  "says which repository the call reaches, and a call naming no `-C` says nothing.",
]

const COMMANDS = [
  "Land akasha content with the akasha commands, which write no body onto the tree by hand:",
  "  akasha change apply --draft keeps the edits, and akasha change apply lands them as one commit",
  "Say `akasha change apply --help` for what an apply takes. A drafting apply naming no change is",
  "refused, and that refusal names every change an apply runs.",
  "",
  ...ELSEWHERE,
]

const EVERY_PATH =
  "Every path this repository tracks is akasha content, so no pathspec bounds a call."

const OVER_ACTS = new Map<string, readonly string[]>([
  [
    "commit",
    [
      "`git commit` writes tracked content into a commit.",
      "A commit carrying akasha content leaves the akasha index behind HEAD, and every agent",
      "here loses the gate until someone puts it back.",
      EVERY_PATH,
      "",
      ...COMMANDS,
    ],
  ],
  [
    "add",
    [
      "`git add` writes tracked content into the index, and the next commit carries it.",
      EVERY_PATH,
      "",
      ...COMMANDS,
    ],
  ],
  [
    "mv",
    [
      "`git mv` moves a tracked file and stages the move.",
      EVERY_PATH,
      "",
      "To move an akasha file, draft it with `akasha change apply --draft move-page`, then",
      "`akasha change apply`.",
      "Say `akasha change apply --help` for what that takes.",
      "",
      ...ELSEWHERE,
    ],
  ],
  [
    "apply",
    [
      "`git apply` writes whatever the patch names.",
      "A patch names its paths inside itself, which this hook does not read, and every path it",
      "could name is akasha content.",
      "",
      ...COMMANDS,
      "",
      "To read a patch without writing it: `git apply --check <patch>`",
    ],
  ],
  [
    "am",
    [
      "`git am` applies a patch and commits it.",
      "A patch names its paths inside itself, which this hook does not read, and every path it",
      "could name is akasha content.",
      "",
      ...COMMANDS,
    ],
  ],
])

const READ_ONLY = new Map<string, readonly string[]>([
  ["commit", []],
  ["add", ["--dry-run"]],
  ["mv", ["--dry-run"]],
  ["apply", ["--check", "--stat", "--numstat", "--summary"]],
  ["am", []],
])

export const SCOPE: readonly string[] = [
  `${HOOK} refuses five git acts: commit, add, mv, apply, am.`,
  "A call is let through where it carries a flag that writes nothing, and where `-C` names a",
  "path in a repository that is not this one. Either one on its own lets the call through.",
  "",
  "WHERE THE RULE COMES FROM: what a git write reaches is not on the command line.",
  "`git commit` with no pathspec commits what is staged, and what is staged is in the index.",
  "So the line has to prove the call cannot reach akasha. A pathspec cannot prove it: every path",
  "this repository tracks is akasha content, so a pathspec naming one names akasha content too.",
  "There is nothing left for a pathspec to prove.",
  "`apply` and `am` name a patch file, and the paths a patch writes are inside the patch.",
  "This does not read the patch, and refuses the call either way.",
  "",
  "READS LET THROUGH, measured against this hook:",
  "  add --dry-run, mv --dry-run",
  "  apply --check, --stat, --numstat, --summary",
  "  `-n` is NOT read as a dry run — for `commit` it is `--no-verify`, which commits.",
  "  `commit` has no read let through. `git status` and `git diff --cached` say the same.",
  "  A read flag is looked for word by word, so `git apply --build-fake-ancestor --check` is",
  "    let through while git reads `--check` as that flag's value. That is a gap, not a rule.",
  "",
  "NOT REACHED. Each measured against this hook, not supposed:",
  "  git stash pop, merge, pull, cherry-pick, revert, rebase — each writes tracked content",
  "  git symbolic-ref, update-ref, notes, fast-import",
  "  git commit-tree piped into git update-ref, which builds a commit naming no act here",
  "  git filter-branch, git replace, git worktree add carrying a checkout",
  "  any act reached through an alias — `git ci -am one` carries the act `ci`",
  "  a git call carrying no act — bare `git`, or global flags alone",
  "  an act inside a quoted run, which the dequoting step takes out before the cut",
  "  an act in a heredoc body, which that step does not take out, so data naming an act is",
  "    refused as though it were a command",
  "  a git call another program builds — `sh -c`, `xargs git commit`, `make`, a script file",
  "  a call behind a prefix the list above does not name, which hides it as `sh -c` does",
  "  every writer that is not git — `cp`, `mv`, a redirect, `sed -i`, an editor, a test",
  "",
  "WHERE THE CALL RUNS IS READ FROM `-C` AND NOWHERE ELSE:",
  "  `git -C <path> <act>` puts on the line the path git resolves the repository from, so that",
  "    line does prove what the call reaches. It is let through where the repository resolved",
  "    from that path is not this one. Several `-C` accumulate as git accumulates them, each",
  "    against the one before it.",
  "  The path is resolved through its symlinks first, and the repository is then asked for its",
  "    toplevel and for its git folder. Sharing a git folder is being the same repository: a",
  "    worktree has a toplevel of its own, so `.git/trees/<name>` here and a worktree of this",
  "    repository checked out anywhere else are both refused, whatever their toplevel is.",
  "  Anything short of that proof is refused, which over-refuses rather than leaving a hole:",
  "    a path that is not there, a path in no repository, a git call that will not answer, a",
  "    relative `-C` (what it is relative to is the cwd, which is not on the line), and any",
  "    global flag before the act but `-C` — `--git-dir`, `--work-tree` and `-c core.worktree`",
  "    each move what the call reaches away from the `-C` path.",
  "  A call carrying no `-C` is refused as it always was: the cwd is not on the line, so nothing",
  "    on the line says which repository the call reaches. That is over-refusal, not a gap.",
  "",
  "A PREFIX THAT ONLY RUNS THE CALL BEHIND IT IS STEPPED OVER, with its own flags, the value a",
  "flag of its own takes, and the number it takes of its own:",
  `  ${RUNS_ANOTHER.join(" ")}`,
  "so `timeout 900 <call>` is the call, and is refused wherever the call is. A prefix flag that",
  "asks rather than runs — `command -v`, `sudo -l` — leaves no call and is let through.",
  "That list samples an open class too. A prefix it does not name hides the call behind it.",
  "",
  "A refusal answers the whole call. One refused act in a chain refuses every command in it.",
  "",
  "NOT NAMED HERE ON PURPOSE:",
  "  `rm`, `checkout`, `restore`, `update-index`, `read-tree` and `checkout-index` write tracked",
  "  akasha content, and this does not name them. block-destructive-git names all six, and",
  "  naming them again here would add no refused call — only",
  "  a second reason for a call already refused, and a second redirect to choose between.",
  "  That choice is worth what the other hook reaches and no more. It reads an act out of the",
  "  command word, so a form that keeps the act out of the command word is refused by neither",
  "  hook. Measured through the dispatch on 2026-09-12, not supposed:",
  "    $(git checkout -f p)   H=$(git restore p)   (git read-tree x)   was let through",
  "  `rm` is the one that looks covered, and is not: that form is refused only where the path",
  "  lands inside akasha, by block-akasha-shell-writes reading the path rather than by",
  "  block-destructive-git reading the act, so `H=$(git rm -f /tmp/x)` was let through too.",
  "  This is one gap in both hooks rather than a bound of this one. It is written here because",
  "  the sentence it replaces was the reason nobody looked.",
  "  `git commit --amend` is refused here, and by block-destructive-git as well.",
  "  Both refusals are true. Neither of them says the call is safe.",
  "",
  "The absence of an act from this list is NOT a finding that it is safe. It is unexamined.",
  "",
  `Printed by \`${HOOK}.agent-hook.code.ts ${SCOPE_FLAG}\`, which is the one place this sits:`,
  "it is what the program says about itself, held as text it prints rather than as a comment.",
]

const AT = "-C"

const ASKING = ["rev-parse", "--path-format=absolute", "--show-toplevel", "--git-common-dir"]

const WAIT = 5_000

type Repository = {
  readonly top: string
  readonly common: string
}

function repositoryAt(at: string): Repository | null {
  const said = told(at, ASKING, { timeout: WAIT })
  if (said === null) return null
  const lines = said.trim().split("\n")
  const top = lines[0]
  const common = lines[1]
  if (top === undefined || common === undefined) return null
  return { top: canonicalize(top), common: canonicalize(common) }
}

function repositoryHere(): Repository | null {
  try {
    return repositoryAt(akashaRoot())
  } catch {
    return null
  }
}

function chdirIn(before: readonly string[]): string | null {
  if (before.length === 0) return null
  let at = ""
  for (let step = 0; step < before.length; step += 2) {
    if (before[step] !== AT) return null
    const value = before[step + 1]
    if (value === undefined) return null
    if (at === "" && !isAbsolute(value)) return null
    at = at === "" ? value : resolve(at, value)
  }
  return at === "" ? null : at
}

function landsElsewhere(before: readonly string[]): boolean {
  const asked = chdirIn(before)
  if (asked === null) return false
  const at = canonicalize(asked)
  const here = repositoryHere()
  if (here === null) return false
  if (isInside(here.top, at)) return false
  const there = repositoryAt(at)
  if (there === null) return false
  if (there.common === here.common) return false
  return !isInside(here.top, there.top)
}

export function refusalFor(call: GitCall): string | null {
  const over = OVER_ACTS.get(call.act)
  if (over === undefined) return null
  const reads = READ_ONLY.get(call.act) ?? []
  if (call.rest.some((word) => reads.includes(word))) return null
  if (landsElsewhere(call.before)) return null
  return toldOf(HOOK, over)
}

export const refusalIn = judgingCalls(gitCallsIn, refusalFor)

async function ran(): Promise<number> {
  return await ranAsCommandHook(HOOK, SCOPE, import.meta.path, refusalIn)
}

if (import.meta.main) process.exit(await ran())
