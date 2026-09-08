import { ranAsCommandHook, SCOPE_FLAG, toldOf } from "../../hook-answer/hook-answer.module.code.ts"

const HOOK = "block-combined-akasha-calls"

const NAMED = /akasha\s+(read|change)(\s|$)/

const OPENS_AKASHA = /^akasha\s/

const SAFE_QUOTED = /'[^']*'|"[^"`$\\]*"/g

const WORD = "[^\\s'\"`$;|&<>()\\\\]+"

const FENCE = "HEREDOC"

const READ = new RegExp("^akasha read( --full| --file-path " + WORD + ")*$")

const CHANGE = new RegExp("^akasha change( " + WORD + "){0,2}( <<'" + FENCE + "')?$")

const REFUSED = [
  "`akasha read` and `akasha change` run alone on the line.",
  "A read is recorded against this agent and a change writes the repository, so what ran has to",
  "be what the record and the commit say ran. A loop, a function, a pipeline, a redirect or a",
  "substitution around either call hides which call was made and what that call was handed.",
  "",
  "  akasha read --file-path <path> [--full]",
  "",
  "takes those flags and no other word, with nothing before it and nothing after it.",
  "",
  "  akasha change <act> <<'HEREDOC'",
  "  at: <path>",
  "  body HEREDOC-BODY",
  "  <the body>",
  "  HEREDOC-BODY",
  "  HEREDOC",
  "",
  "takes the act, the words that act takes, and one heredoc whose closing line ends the command.",
  "The shell's delimiter is always `HEREDOC`, so there is nothing to pick there.",
  "",
  "That word occurs as a line once, at the end. A body carrying that line of its own is refused,",
  "because the shell would end the body there and run what follows as commands.",
  "",
  "Each argument opens a fence of its own, which akasha reads rather than the shell. Write the",
  "key in capitals after `HEREDOC-`: `old` closes on `HEREDOC-OLD`, `new` on `HEREDOC-NEW`. A",
  "body carrying its own fence as a line takes another, as `akasha change --help` says.",
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
  "WHERE THE RULE COMES FROM: a read records what an agent saw and a change writes the",
  "repository. Both are worth what their record is worth. Shell around either one makes the",
  "command that ran different from the command that was read, and the record cannot say which.",
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
  "  a prefix such as `env`, `timeout` or `sudo` before either call",
  "  a `cd` before either call, which neither needs, both reaching the repository the same way",
  "    from any working directory",
  "  either name inside a quoted run, where the command opens with another word",
  "  either name inside a heredoc body, refused there as a call is",
  "  either name outside a quoted run, where the command opens with `akasha`",
  "",
  "A QUOTED RUN THE SHELL WOULD NOT REWRITE IS TAKEN OUT before the trigger is looked for,",
  "but only where the command opens with `akasha`. That lets another akasha command carry",
  "either name in a message without being judged as a call. A run holding a `$`, a backtick",
  "or a backslash is left in, because the shell rewrites what is inside such a run. The",
  "condition on the first word is what keeps `sh -c` from quoting its way past this hook.",
  "",
  "NOT REACHED:",
  "  `akasha` reached by a name that is not `akasha`, which the trigger never finds",
  "  every akasha command but these two",
  "  a call another program builds and runs, which reaches no hook as text",
  "  either name inside a run the shell would not rewrite, in a command opening `akasha`",
  "",
  "The absence of a shape from the reached list is NOT a finding that it is let through. That",
  "list is what was measured; the rule is the match.",
  "",
  `Printed by \`${HOOK}.agent-hook.code.ts ${SCOPE_FLAG}\`, which is the one place this sits:`,
  "it is what the program says about itself, held as text it prints rather than as a comment.",
]

export function approvedForm(command: string): boolean {
  const text = command.trim()
  if (READ.test(text)) return true
  const lines = text.split("\n")
  const opening = lines[0] ?? ""
  const found = CHANGE.exec(opening)
  if (found === null) return false
  const closings = lines.filter((line) => line === FENCE).length
  if (found[2] === undefined) return closings === 0 && lines.length === 1
  return closings === 1 && lines[lines.length - 1] === FENCE
}

export function triggered(command: string): boolean {
  const text = command.trim()
  const looked = OPENS_AKASHA.test(text) ? text.replace(SAFE_QUOTED, "") : text
  return NAMED.test(looked)
}

export function refusalIn(command: string): string | null {
  if (!triggered(command)) return null
  return approvedForm(command) ? null : toldOf(HOOK, REFUSED)
}

export async function ran(): Promise<number> {
  return await ranAsCommandHook(HOOK, SCOPE, import.meta.path, refusalIn)
}

if (import.meta.main) process.exit(await ran())
