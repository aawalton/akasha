import { ranAsCommandHook, SCOPE_FLAG, toldOf } from "../../hook-answer/hook-answer.module.code.ts"

const HOOK = "block-combined-akasha-calls"

const NAMED = /akasha\s+(read|change)(\s|$)/

const WORD = "[^\\s'\"`$;|&<>()\\\\]+"

const READ = new RegExp("^akasha read( --file-path " + WORD + ")*$")

const CHANGE = new RegExp("^akasha change( " + WORD + "){0,2}( <<'([A-Za-z_][A-Za-z0-9_]*)')?$")

const REFUSED = [
  "`akasha read` and `akasha change` run alone on the line.",
  "A read is recorded against this agent and a change writes the repository, so what ran has to",
  "be what the record and the commit say ran. A loop, a function, a pipeline, a redirect or a",
  "substitution around either call hides which call was made and what that call was handed.",
  "",
  "  akasha read --file-path <path>",
  "",
  "takes those flags and no other word, with nothing before it and nothing after it.",
  "",
  "  akasha change <act> <<'EOF'",
  "  at: <path>",
  "  body <<BODY",
  "  <the body>",
  "  <<BODY",
  "  EOF",
  "",
  "takes the act, the words that act takes, and one heredoc whose closing line ends the command.",
  "",
  "The delimiter is quoted so the shell rewrites nothing. Opened `<<EOF` instead, a `$HOME` in",
  "the body is replaced and a `$(...)` is run before akasha reads the body, and nothing says so.",
  "A body ending mid-line is opened `body <<BODY no-newline` rather than piped in.",
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
  "  either name inside a quoted run or a heredoc body, refused there as a call is",
  "",
  "NOT REACHED:",
  "  `akasha` reached by a name that is not `akasha`, which the trigger never finds",
  "  every akasha command but these two",
  "  a call another program builds and runs, which reaches no hook as text",
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
  const fence = found[3]
  if (fence === undefined) return lines.length === 1
  return lines.length > 1 && lines[lines.length - 1] === fence
}

export function refusalIn(command: string): string | null {
  if (!NAMED.test(command)) return null
  return approvedForm(command) ? null : toldOf(HOOK, REFUSED)
}

export async function ran(): Promise<number> {
  return await ranAsCommandHook(HOOK, SCOPE, import.meta.path, refusalIn)
}

if (import.meta.main) process.exit(await ran())
