import type { GitCall } from "../../git-calls/git-calls.module.code.ts"
import { gitCallsIn } from "../../git-calls/git-calls.module.code.ts"
import {
  ASIDE,
  commandIn,
  refusing,
  STANDING_ASIDE,
  said,
} from "../../hook-answer/hook-answer.module.code.ts"

const HOOK = "block-destructive-git"

const SCOPE_FLAG = "--scope"

const HELP = "Say `akasha --help` for what each takes."

const SHARED = "This worktree is shared, so the work it writes over may not be yours."

const NONE = [
  "No akasha command does this, and none is planned.",
  "If it has to happen, say what you were doing and ask Alan.",
]

const PUT_BACK = [
  "To put one file back the way HEAD has it, take the body first:",
  "  git show HEAD:<path> > <body>",
  "then write <body> to <path>:",
  "  under `akasha/`:  akasha write",
  "  anywhere else:    cp <body> <path>",
  HELP,
]

const TAKE_AWAY = [
  "To take a file away:",
  "  under `akasha/`:  akasha remove",
  '  anywhere else:    rm <path> && git commit -m "<why>" -- <path>',
  HELP,
]

const SAY_AGAIN = ["To change what a commit says, land another one with `akasha write`.", HELP]

const OVER_VERBS = new Map<string, readonly string[]>([
  [
    "stash",
    [
      "`git stash` takes every uncommitted change in this worktree away.",
      "Agents you cannot see are working in it.",
      ...NONE,
    ],
  ],
  [
    "reset",
    [
      "`git reset` moves HEAD and can drop uncommitted work.",
      "The work it drops is not only yours.",
      ...NONE,
    ],
  ],
  [
    "rebase",
    [
      "`git rebase` rewrites commits others have built on, and can stop the worktree mid-way.",
      ...NONE,
    ],
  ],
  [
    "checkout",
    ["`git checkout` writes the working tree over uncommitted work.", SHARED, ...PUT_BACK],
  ],
  [
    "restore",
    ["`git restore` writes the working tree over uncommitted work.", SHARED, ...PUT_BACK],
  ],
  [
    "clean",
    [
      "`git clean` deletes untracked files.",
      "An untracked file is usually work another agent has not landed yet.",
      ...NONE,
    ],
  ],
  [
    "rm",
    [
      "`git rm` deletes a file and stages the deletion.",
      "This worktree is shared, so a staged deletion lands in whatever commits next.",
      ...TAKE_AWAY,
    ],
  ],
])

const FORCED_PUSH: readonly string[] = [
  "--force",
  "-f",
  "--force-with-lease",
  "--force-if-includes",
]

const AMENDED = [
  "`git commit --amend` rewrites the commit at HEAD.",
  "Other agents have already read it and built on it.",
  ...SAY_AGAIN,
]

const FORCED = ["`git push --force` overwrites commits on a branch other agents push to.", ...NONE]

const DELETED = [
  "`git branch --delete --force` deletes a branch whose commits may be reachable from nowhere else.",
  ...NONE,
]

export const SCOPE: readonly string[] = [
  `${HOOK} refuses seven git verbs, and three flagged forms of three more.`,
  "  stash reset rebase checkout restore clean rm",
  "  commit --amend",
  "  push --force / -f / --force-with-lease / --force-if-includes",
  "  branch -D / branch --delete --force",
  "",
  "WHERE THE LIST COMES FROM: nowhere.",
  "Git names its verbs exactly and classifies none of them by this hazard.",
  "All seven verbs sit in `list-mainporcelain`, beside status, log, diff and grep.",
  "`list-worktree` holds two of the seven, plus two verbs that destroy nothing.",
  "Five of the seven sit in no attribute group at all.",
  "Refusing a whole group would refuse ordinary reading.",
  "The hazard also sits under the verb rather than at it:",
  "  `worktree list` reads and `worktree remove --force` destroys",
  "  `config --get` reads and `config --unset` writes",
  "No enumeration of verbs can say that.",
  "The reason is structural. The hazard is `destroys another agent's uncommitted work in a",
  "worktree several agents share`, and git holds no notion of several agents sharing a",
  "worktree, so it holds no opinion to derive this list from.",
  "This list samples an open world. It does not define one.",
  "",
  "A refusal answers the whole call. One refused verb in a chain refuses every command in it.",
  "",
  "NOT REACHED. Each measured against this hook, not supposed:",
  "  git checkout-index -a -f      writes the working tree from the index",
  "  git read-tree -u <tree>       writes the working tree from a tree",
  "  git worktree remove --force   removes a worktree holding uncommitted work",
  "  git update-ref, symbolic-ref, update-index, switch, revert, apply, reflog expire, gc",
  "  any verb reached through an alias — `git undo` carries the verb `undo`",
  "  a git call carrying no verb — bare `git`, or global flags alone",
  "  a verb inside a quoted run, which the dequoting step takes out before the cut",
  "  a verb in a heredoc body, which that step does not take out, so data naming a verb is",
  "    refused as though it were a command",
  "  a git call another program builds — `sh -c`, `xargs git`, `make`, a script file",
  "  every way to destroy shared work that is not a git call at all",
  "",
  "ALSO REFUSED ELSEWHERE:",
  "  `git commit --amend` naming no paths is refused by block-git-writes as well.",
  "  Both refusals are true. Neither of them says the call is safe.",
  "",
  "The absence of a verb from this list is NOT a finding that it is safe. It is unexamined.",
  "Do not close a gap here by adding the verb. A denylist over an open hazard family teaches",
  "its own holes: the refusal is what sends a reader looking for the neighbouring verb it did",
  "not name, and a longer list is a longer search prompt. A gap found here is evidence that",
  "this guard cannot close its class, not an invitation to extend it.",
  "",
  `Printed by \`${HOOK}.agent-hook.code.ts ${SCOPE_FLAG}\`, which is the one place this stands:`,
  "it is what the program says about itself, held as text it prints rather than as a comment.",
]

function toldOf(said: readonly string[]): string {
  return [`${HOOK} refused this call.`, "", ...said].join("\n")
}

function amendedIn(rest: readonly string[]): boolean {
  return rest.some((word) => word === "--amend" || word.startsWith("--amend="))
}

function forcedIn(rest: readonly string[]): boolean {
  return rest.some((word) => FORCED_PUSH.includes(word) || word.startsWith("--force-with-lease="))
}

function deletedIn(rest: readonly string[]): boolean {
  if (rest.includes("-D")) return true
  return rest.includes("--delete") && (rest.includes("--force") || rest.includes("-f"))
}

export function refusalFor(call: GitCall): string | null {
  const over = OVER_VERBS.get(call.verb)
  if (over !== undefined) return toldOf(over)
  if (call.verb === "commit" && amendedIn(call.rest)) return toldOf(AMENDED)
  if (call.verb === "push" && forcedIn(call.rest)) return toldOf(FORCED)
  if (call.verb === "branch" && deletedIn(call.rest)) return toldOf(DELETED)
  return null
}

export function refusalIn(command: string): string | null {
  for (const call of gitCallsIn(command)) {
    const reason = refusalFor(call)
    if (reason !== null) return reason
  }
  return null
}

async function main(): Promise<number> {
  if (Bun.argv[2] === SCOPE_FLAG) {
    process.stdout.write(`${SCOPE.join("\n")}\n`)
    return ASIDE
  }
  const read = commandIn(await Bun.stdin.text(), "command", HOOK)
  if ("answer" in read) return said(read.answer)
  const reason = refusalIn(read.command)
  return said(reason === null ? STANDING_ASIDE : refusing(reason))
}

if (import.meta.main) process.exit(await main())
