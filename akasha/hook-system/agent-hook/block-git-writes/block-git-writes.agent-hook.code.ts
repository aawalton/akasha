import type { GitCall } from "../../git-calls.module.code.ts"
import { gitCallsIn } from "../../git-calls.module.code.ts"
import {
  ASIDE,
  commandIn,
  refusing,
  said,
  STANDING_ASIDE,
} from "../../hook-answer.module.code.ts"

const HOOK = "block-git-writes"

const SCOPE_FLAG = "--scope"

const PATHS = "--"

const INSIDE = "akasha"

const UNBOUNDED: readonly string[] = [".", "..", "./", "/", "*"]

const COMMANDS = [
  "Land akasha content with the akasha commands, which commit for themselves:",
  "  akasha write, akasha edit, akasha move, akasha remove",
  "Say `akasha --help` for what each takes.",
]

const OVER_VERBS = new Map<string, readonly string[]>([
  [
    "commit",
    [
      "`git commit` writes tracked content into a commit.",
      "A commit carrying akasha content leaves the akasha index behind HEAD, and every agent",
      "here loses the gate until someone puts it back.",
      "",
      ...COMMANDS,
      "",
      "For a commit reaching nothing under `akasha/`, name its paths after `--`:",
      `  git commit -m "<why>" ${PATHS} <path> <path>`,
    ],
  ],
  [
    "add",
    [
      "`git add` writes tracked content into the index, and the next commit carries it.",
      "",
      ...COMMANDS,
      "",
      "To stage paths reaching nothing under `akasha/`, name them after `--`:",
      `  git add ${PATHS} <path> <path>`,
    ],
  ],
  [
    "mv",
    [
      "`git mv` moves a tracked file and stages the move.",
      "",
      "To move an akasha file, use `akasha move`.",
      "Say `akasha --help` for what it takes.",
      "",
      "To move paths reaching nothing under `akasha/`, name them after `--`:",
      `  git mv ${PATHS} <from> <to>`,
    ],
  ],
  [
    "apply",
    [
      "`git apply` writes whatever the patch names.",
      "A patch names its paths inside itself, which this hook does not read, so no `--` bounds it.",
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
      "A patch names its paths inside itself, which this hook does not read, so no `--` bounds it.",
      "",
      ...COMMANDS,
    ],
  ],
])

const BOUNDABLE: readonly string[] = ["commit", "add", "mv"]

const READ_ONLY = new Map<string, readonly string[]>([
  ["commit", []],
  ["add", ["--dry-run"]],
  ["mv", ["--dry-run"]],
  ["apply", ["--check", "--stat", "--numstat", "--summary"]],
  ["am", []],
])

export const SCOPE: readonly string[] = [
  `${HOOK} refuses five git verbs: commit, add, mv, apply, am.`,
  "A call is let through only when it names paths after `--` and every one of them stands",
  "outside the akasha folder, or when it carries a flag that writes nothing.",
  "",
  "WHERE THE RULE COMES FROM: what a git write reaches is not on the command line.",
  "`git commit` with no pathspec commits what is staged, and what is staged is in the index.",
  "So the line has to prove the call cannot reach akasha, and the only proof a line carries",
  "is an explicit pathspec. Everything else is refused.",
  "`apply` and `am` name a patch file, and the paths a patch writes are inside the patch.",
  "This does not read the patch, so those two are never bounded.",
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
  "  git update-index, read-tree, checkout-index, symbolic-ref, update-ref, notes, fast-import",
  "  git commit-tree piped into git update-ref, which builds a commit naming no verb here",
  "  git filter-branch, git replace, git worktree add carrying a checkout",
  "  any verb reached through an alias — `git ci -am one` carries the verb `ci`",
  "  a git call carrying no verb — bare `git`, or global flags alone",
  "  a verb inside a quoted run, which the dequoting step takes out before the cut",
  "  a verb in a heredoc body, which that step does not take out, so data naming a verb is",
  "    refused as though it were a command",
  "  a git call another program builds — `sh -c`, `xargs git commit`, `make`, a script file",
  "  every writer that is not git — `cp`, `mv`, a redirect, `sed -i`, an editor, a test",
  "",
  "WHAT `--` DOES AND DOES NOT PROVE:",
  "  It bounds a call by the paths it names, never by where the call runs.",
  `  \`git -C /elsewhere commit ${PATHS} one.ts\` is let through, and \`/elsewhere\` is not read.`,
  "  A call in another repository is refused the same as one here, and `-C` is read only far",
  "    enough to find the verb behind it.",
  "  A path is judged by its own words. A segment `akasha` means inside.",
  "  `../akasha/one.ts` and `.` and `*` and a pathspec magic word are read as unbounded.",
  "  An absolute path into this repository carries an `akasha` segment for the repository's",
  "    own directory, so it reads as inside and is refused. That is over-refusal, not a gap.",
  "",
  "NOT NAMED HERE ON PURPOSE:",
  "  `rm`, `checkout` and `restore` write tracked akasha content, and this does not name them.",
  "  block-destructive-git refuses every form of all three, at every path, so naming them",
  "  again would add no refused call — only a second reason for a call already refused, and a",
  "  second redirect for a reader to choose between.",
  "  `git commit --amend` is refused here when it is unbounded, and by block-destructive-git",
  "  always. Both refusals are true. Neither of them says the call is safe.",
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

export function outsideAkasha(path: string): boolean {
  if (path === "") return false
  if (UNBOUNDED.includes(path)) return false
  if (path.startsWith("..")) return false
  if (path.startsWith(":")) return false
  if (path.includes("*")) return false
  return !path.split("/").includes(INSIDE)
}

export function bounded(rest: readonly string[]): boolean {
  const at = rest.indexOf(PATHS)
  if (at === -1) return false
  const paths = rest.slice(at + 1)
  if (paths.length === 0) return false
  return paths.every(outsideAkasha)
}

function toldOf(said: readonly string[]): string {
  return [`${HOOK} refused this call.`, "", ...said].join("\n")
}

export function refusalFor(call: GitCall): string | null {
  const over = OVER_VERBS.get(call.verb)
  if (over === undefined) return null
  const reads = READ_ONLY.get(call.verb) ?? []
  if (call.rest.some((word) => reads.includes(word))) return null
  if (BOUNDABLE.includes(call.verb) && bounded(call.rest)) return null
  return toldOf(over)
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
