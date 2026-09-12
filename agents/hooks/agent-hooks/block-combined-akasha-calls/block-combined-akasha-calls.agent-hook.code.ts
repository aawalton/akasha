import {
  ranAsCommandHook,
  SCOPE_FLAG,
  toldOf,
} from "akasha/agents/hooks/answer/hook-answer.module.code.ts"
import { z } from "zod"

const HOOK = "block-combined-akasha-calls"

const NAMED = /akasha\s+(read|change)(\s|$)/

const OPENS_AKASHA = /^akasha\s/

const SAFE_QUOTED = /'[^']*'|"[^"`$\\]*"/g

const WORD = "[^\\s'\"`$;|&<>()\\\\]+"

const QUOTED = "'[^']*'"

const PATH = "(?:" + WORD + "|" + QUOTED + ")"

const ASSIGNED = new RegExp("^(?:[A-Za-z_][A-Za-z0-9_]*=" + PATH + "? +)+")

const FENCE = "HEREDOC"

const READ = new RegExp("^akasha read( --full| --file-path " + PATH + ")*$")

const CHANGE = new RegExp("^akasha change( " + WORD + "){0,2}( <<'" + FENCE + "')?$")

const REFUSED = [
  "`akasha read` and `akasha change` run alone on the line.",
  "A read is recorded against this agent, and a change writes the repository, so what ran has to",
  "be what the record and the commit say ran. A loop, a function, a pipeline, a redirect, a",
  "substitution, or a second command joined on by `;` or `&&`, hides which call was made and",
  "what that call was handed.",
  "",
  "  akasha read --file-path <path> [--full]",
  "",
  "takes those flags and no other word, with nothing before it and nothing after it. A path",
  "holding a character the shell would act on is written in single quotes, which the shell",
  "leaves whole: `akasha read --file-path 'routes/api.pages.$pageTypeSlug.ts'`.",
  "",
  "  akasha change draft <act> <<'HEREDOC'",
  "  at: <path>",
  "  body HEREDOC-BODY",
  "  <the body>",
  "  HEREDOC-BODY",
  "  HEREDOC",
  "",
  "  akasha change apply <<'HEREDOC'",
  "  message: <what the commit is for>",
  "  HEREDOC",
  "",
  "take the change command, the one word that command takes, and one heredoc whose closing line",
  "ends the call. A change command taking no word, and one opening no heredoc, are that same form",
  "with less in it, so `akasha change apply` and `akasha change list` are approved on their own.",
  "`akasha change` names the commands it carries.",
  "",
  "A run of `NAME=value` before either form is let through, because the shell sets those names",
  "rather than running anything: `AKASHA_CPU_PROFILE_DIR=/tmp/prof akasha change apply`. A value",
  "there is a bare word or a run in single quotes, as a path a read names is.",
  "",
  "The shell's delimiter is always `HEREDOC`, so there is nothing to pick there.",
  "",
  "That word occurs as a line once, at the end. A body carrying that line of its own is refused,",
  "because the shell would end the body there and run what follows as commands.",
  "",
  "Each argument opens a fence of its own, which akasha reads rather than the shell. Write the",
  "key in capitals after `HEREDOC-`: `old` closes on `HEREDOC-OLD`, `new` on `HEREDOC-NEW`. A",
  "body carrying its own fence as a line takes another, as `akasha change draft --help` says.",
  "",
  "The delimiter is quoted so the shell rewrites nothing. Opened unquoted, a `$HOME` in the body",
  "is replaced and a `$(...)` is run before akasha reads the body, and nothing says so.",
  "A body ending mid-line is opened `body HEREDOC-BODY no-newline` rather than piped in.",
]

export const SCOPE: readonly string[] = [
  `${HOOK} refuses a command naming \`akasha read\` or \`akasha change\` unless the whole`,
  "command is one of the two approved forms. It matches the command whole rather than looking",
  "for a forbidden shape inside it.",
  "",
  "WHERE THE RULE COMES FROM: a read records what an agent saw, and a change writes the",
  "repository. Both are worth what their record is worth. Shell around one makes the command",
  "that ran different from the command that was read, and the record cannot say which.",
  "",
  "WHY THE WHOLE COMMAND: this hook reads no shell structure, so no structure hides a call from",
  "it. A loop is refused because a loop is no approved form rather than because a loop is known",
  "here. `shell-calls` reads a line without being a shell, and every construct it does not part",
  "on hides the call behind it from each hook that imports it. Nothing here rests on that.",
  "",
  "REACHED. Each measured against this hook rather than supposed:",
  "  a chain, a pipeline, a redirect either way, a call sent to the background",
  "  a `for`, a `while`, an `if`, a function body, a subshell, a brace group",
  "  a substitution, in backticks or in `$( )`",
  "  a prefix such as `env`, `timeout` or `sudo` before one of them, each of which runs it",
  "  an assignment whose value the shell would rewrite, such as `D=$(pwd)`, before one of them",
  "  a `cd` before one of them, which none needs, all reaching the repository the same way",
  "    from any working directory",
  "  one of the names inside a quoted run, where the command opens with another word",
  "  one of the names inside a heredoc body, refused there as a call is",
  "  one of the names outside a quoted run, where the command opens with `akasha`",
  "",
  "A QUOTED RUN THE SHELL WOULD NOT REWRITE IS TAKEN OUT before the trigger is looked for,",
  "but only where the command opens with `akasha`. That lets another akasha command carry",
  "one of the names in a message without being judged as a call. A run holding a `$`, a backtick",
  "or a backslash is left in, because the shell rewrites what is inside such a run. The",
  "condition on the first word is what keeps `sh -c` from quoting its way past this hook.",
  "",
  "A PATH A READ NAMES is a bare word or a run in single quotes. A single-quoted run is literal",
  "to the shell, so it is worth what a bare word is worth, and it is how a path holding a `$`",
  "is named at all. Without it no such path could be read, and so no such file could be written",
  "or taken away.",
  "",
  "NOT REACHED:",
  "  a run of `NAME=value` before one of them, which the shell sets rather than runs",
  "  `akasha` reached by a name that is not `akasha`, which the trigger never finds",
  "  every akasha command but these two",
  "  a call another program builds and runs, which reaches no hook as text",
  "  one of the names inside a run the shell would not rewrite, in a command opening `akasha`",
  "",
  "The absence of a shape from the reached list is NOT a finding that it is let through. That",
  "list is what was measured; the rule is the match.",
  "",
  `Printed by \`${HOOK}.agent-hook.code.ts ${SCOPE_FLAG}\`, which is the one place this sits:`,
  "it is what the program says about itself, held as text it prints rather than as a comment.",
]

const CAPTURES = z.array(z.string().optional())

function parseChangeOpening(opening: string): boolean | null {
  const read = CAPTURES.safeParse(CHANGE.exec(opening))
  return read.success ? read.data[2] !== undefined : null
}

function closedIn(lines: readonly string[], opened: boolean): boolean {
  const closings = lines.filter((line) => line === FENCE).length
  if (!opened) return closings === 0 && lines.length === 1
  return closings === 1 && lines[lines.length - 1] === FENCE
}

function pastAssignments(command: string): string {
  return command.trim().replace(ASSIGNED, "")
}

export function approvedForm(command: string): boolean {
  const text = pastAssignments(command)
  if (READ.test(text)) return true
  const lines = text.split("\n")
  const opened = parseChangeOpening(lines[0] ?? "")
  return opened !== null && closedIn(lines, opened)
}

export function triggered(command: string): boolean {
  const text = pastAssignments(command)
  const looked = OPENS_AKASHA.test(text) ? text.replace(SAFE_QUOTED, "") : text
  return NAMED.test(looked)
}

const KEPT = 8

const SHOWN = 160

const QUOTED_SAID = "This is the call refused, as the shell was handed it:"

const MEASURED_SAID = [
  "It is measured whole against the two forms below, so every word of it is part of the call,",
  "and anything outside one of those forms refuses it, whatever that thing is.",
]

function shownOf(line: string): string {
  return line.length <= SHOWN ? line : `${line.slice(0, SHOWN)} …`
}

export function quotedIn(command: string): readonly string[] {
  const lines = command.trim().split("\n")
  const kept = lines.slice(0, KEPT).map((one) => `  ${shownOf(one)}`)
  const left = lines.length - KEPT
  if (left <= 0) return kept
  return [...kept, left === 1 ? "  … and one more line" : `  … and ${left} more lines`]
}

export function refusalIn(command: string): string | null {
  if (!triggered(command)) return null
  if (approvedForm(command)) return null
  return toldOf(HOOK, [QUOTED_SAID, "", ...quotedIn(command), "", ...MEASURED_SAID, "", ...REFUSED])
}

export async function ran(): Promise<number> {
  return await ranAsCommandHook(HOOK, SCOPE, import.meta.path, refusalIn)
}

if (import.meta.main) process.exit(await ran())
