import { judgingCalls } from "../../chain-refusal/chain-refusal.module.code.ts"
import type { GitCall } from "../../git-calls/git-calls.module.code.ts"
import { gitCallsIn } from "../../git-calls/git-calls.module.code.ts"
import { ranAsHook, SCOPE_FLAG, toldOf } from "../../hook-answer/hook-answer.module.code.ts"
import { RUNS_ANOTHER } from "../../shell-calls/shell-calls.module.code.ts"

const HOOK = "block-destructive-git"

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

const SAY_AGAIN = [
  "To change what a commit says, draft another with `akasha write` and `akasha patch apply`.",
  HELP,
]

const OVER_ACTS = new Map<string, readonly string[]>([
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

const PUSHED = [
  "`git push` is refused for an agent in every form, and `akasha push` is the route that is not.",
  "It carries the branch this checkout is on to the remote that branch tracks, it forces nothing",
  "in any form, and where the remote has moved ahead it refuses rather than overwriting.",
  "Say `akasha push`, or `akasha push --dry-run` to read how many commits would be carried",
  "without reaching the remote at all.",
  "Reach for no other route from here: another remote, another branch, a refspec, or",
  "`git push --dry-run` — every one of them is this same act and every one is refused here.",
]

const DELETED = [
  "`git branch --delete --force` deletes a branch whose commits may be reachable from nowhere else.",
  ...NONE,
]

export const SCOPE: readonly string[] = [
  `${HOOK} refuses eight git acts, and two flagged forms of two more.`,
  "  stash reset rebase checkout restore clean rm",
  "  push, in every form — `akasha push` is the route that is not refused",
  "  commit --amend",
  "  push --force / -f / --force-with-lease / --force-if-includes",
  "  branch -D / branch --delete --force",
  "",
  "EVERY `push` IS REFUSED, NOT ONLY A FORCED ONE, and `akasha push` answers in its place.",
  "The widening was added on 2026-09-03 for the akasha migration, after two pushes carried",
  "5,848 commits of migration work to origin. The migration is done and its constraint went",
  "with it, so the refusal holds now for a reason of its own: a push is worth making on one",
  "route that forces nothing and reports what it carried, rather than on whatever an agent",
  "composes at the moment it wants the remote to move.",
  "WHAT THE PUSH REFUSAL DOES NOT REACH, each measured against this hook rather than supposed:",
  "  `gp`, the `git push` alias a seat's bashrc carries — a hook is given the words of the tool",
  "    call, and `gp` carries no `git`, so no git call is read out of it at all. What closes",
  "    `gp` is `terminal-bash`, which composes no alias that pushes while the migration runs.",
  "  a push a program makes for itself — `handOffPush` spawns the pusher detached, under no",
  "    tool call, so nothing here is ever asked about it",
  "  anything typed into a terminal rather than sent as a tool call, which no hook is given",
  "",
  "WHERE THE LIST COMES FROM: nowhere.",
  "Git names its acts exactly and classifies none of them by this hazard.",
  "All seven acts sit in `list-mainporcelain`, beside status, log, diff and grep.",
  "`list-worktree` holds two of the seven, plus two acts that destroy nothing.",
  "Five of the seven sit in no attribute group at all.",
  "Refusing a whole group would refuse ordinary reading.",
  "The hazard also sits under the act rather than at it:",
  "  `worktree list` reads and `worktree remove --force` destroys",
  "  `config --get` reads and `config --unset` writes",
  "No enumeration of acts can say that.",
  "The reason is structural. The hazard is `destroys another agent's uncommitted work in a",
  "worktree several agents share`, and git holds no notion of several agents sharing a",
  "worktree, so it holds no opinion to derive this list from.",
  "This list samples an open world. It does not define one.",
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
  "NOT REACHED. Each measured against this hook, not supposed:",
  "  git checkout-index -a -f      writes the working tree from the index",
  "  git read-tree -u <tree>       writes the working tree from a tree",
  "  git worktree remove --force   removes a worktree holding uncommitted work",
  "  git update-ref, symbolic-ref, update-index, switch, revert, apply, reflog expire, gc",
  "  any act reached through an alias — `git undo` carries the act `undo`",
  "  a git call carrying no act — bare `git`, or global flags alone",
  "  an act inside a quoted run, which the dequoting step takes out before the cut",
  "  an act in a heredoc body, which that step does not take out, so data naming an act is",
  "    refused as though it were a command",
  "  a git call another program builds — `sh -c`, `xargs git`, `make`, a script file",
  "  a call behind a prefix the list above does not name, which hides it as `sh -c` does",
  "  every way to destroy shared work that is not a git call at all",
  "",
  "ALSO REFUSED ELSEWHERE:",
  "  `git commit --amend` naming no paths is refused by block-git-writes as well.",
  "  Both refusals are true. Neither of them says the call is safe.",
  "",
  "The absence of an act from this list is NOT a finding that it is safe. It is unexamined.",
  "Do not close a gap here by adding the act. A denylist over an open hazard family teaches",
  "its own holes: the refusal is what sends a reader looking for the neighbouring act it did",
  "not name, and a longer list is a longer search prompt. A gap found here is evidence that",
  "this guard cannot close its class, not an invitation to extend it.",
  "",
  `Printed by \`${HOOK}.agent-hook.code.ts ${SCOPE_FLAG}\`, which is the one place this stands:`,
  "it is what the program says about itself, held as text it prints rather than as a comment.",
]

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
  const over = OVER_ACTS.get(call.act)
  if (over !== undefined) return toldOf(HOOK, over)
  if (call.act === "commit" && amendedIn(call.rest)) return toldOf(HOOK, AMENDED)
  if (call.act === "push" && forcedIn(call.rest)) return toldOf(HOOK, FORCED)
  if (call.act === "push") return toldOf(HOOK, PUSHED)
  if (call.act === "branch" && deletedIn(call.rest)) return toldOf(HOOK, DELETED)
  return null
}

export const refusalIn = judgingCalls(gitCallsIn, refusalFor)

export async function ran(): Promise<number> {
  return await ranAsHook(HOOK, "command", SCOPE, import.meta.path, refusalIn)
}

if (import.meta.main) process.exit(await ran())
