import {
  type ArithmeticExpression,
  type AssignmentPrefix,
  type Command,
  type Node,
  type ParsedScript,
  parse,
  type Redirect,
  type Statement,
  type TestExpression,
  type Word,
  type WordPart,
} from "unbash"

const NUMBER = /^[0-9]/

const ASSIGNMENT = /^[A-Za-z_][A-Za-z0-9_]*=/

const SPACE = /\s/g

export const SPACE_IN_A_WORD = "␣"

const RUNNING_A_STRING = /^-[A-Za-z]*c[A-Za-z]*$/

const SHELLS: readonly string[] = ["sh", "bash", "zsh", "dash", "ksh"]

const EVAL = "eval"

const FED: readonly string[] = ["<<", "<<-", "<<<"]

const FLAGGED = /^[-+]/

const EXPANDED = /[$`]/

const LINE = "\n"

const HOME = /^~[\w.+-]*(?:\/|$)/

type Runner = {
  readonly valued: readonly string[]
  readonly asking: readonly string[]
  readonly numbered: number
}

const PLAIN: Runner = { valued: [], asking: [], numbered: 0 }

const RUNNING_ANOTHER: ReadonlyMap<string, Runner> = new Map<string, Runner>([
  ["sudo", { valued: ["-u", "-g", "-p", "-C"], asking: ["-v", "-V", "-l"], numbered: 0 }],
  ["doas", { valued: ["-u", "-C"], asking: ["-L"], numbered: 0 }],
  [
    "env",
    {
      valued: ["-u", "--unset", "-C", "--chdir", "-S", "--split-string"],
      asking: [],
      numbered: 0,
    },
  ],
  ["command", { valued: [], asking: ["-v", "-V"], numbered: 0 }],
  ["exec", { valued: ["-a"], asking: [], numbered: 0 }],
  ["nohup", PLAIN],
  ["setsid", PLAIN],
  ["unbuffer", PLAIN],
  ["nice", { valued: ["-n", "--adjustment"], asking: [], numbered: 0 }],
  [
    "ionice",
    {
      valued: ["-c", "--class", "-n", "--classdata", "-p", "--pid", "-P", "--pgid", "-u", "--uid"],
      asking: [],
      numbered: 0,
    },
  ],
  ["chrt", { valued: ["-p", "--pid"], asking: [], numbered: 1 }],
  ["taskset", { valued: ["-c", "--cpu-list", "-p", "--pid"], asking: [], numbered: 1 }],
  ["timeout", { valued: ["-k", "--kill-after", "-s", "--signal"], asking: [], numbered: 1 }],
  [
    "stdbuf",
    { valued: ["-i", "--input", "-o", "--output", "-e", "--error"], asking: [], numbered: 0 },
  ],
  ["time", { valued: ["-o", "--output", "-f", "--format"], asking: [], numbered: 0 }],
])

export const RUNS_ANOTHER: readonly string[] = [...RUNNING_ANOTHER.keys()]

export const READ_AS_BASH: readonly string[] = [
  "A CALL IS READ AS BASH READS IT, by a bash parser. A call a substitution, backticks, a",
  "subshell, an assignment's value, `sh -c` or `eval` holds is read as a call on the line is.",
  "A quoted run is one word, and a heredoc body is written rather than run unless a shell is",
  "handed it. A line the parser cannot read whole is read again one line at a time.",
]

type Call = { readonly segment: string; readonly handed: string }

type Said = { readonly shown: string; readonly value: string }

type Reading = {
  readonly calls: Call[]
  readonly unread: string[]
  readonly known: Map<string, string>
}

export function wordsOf(segment: string): readonly string[] {
  return segment.split(/\s+/).filter((word) => word !== "")
}

export function basenameOf(word: string): string {
  return word.slice(word.lastIndexOf("/") + 1)
}

export function ranBy(words: readonly string[]): string | null {
  for (const one of words) {
    if (one.startsWith("-")) continue
    return basenameOf(one)
  }
  return null
}

function pastRunner(words: readonly string[], from: number, runner: Runner): number {
  let at = from
  let numbers = 0
  while (at < words.length) {
    const one = words[at] ?? ""
    if (runner.asking.includes(one)) return words.length
    if (runner.valued.includes(one)) {
      at += 2
      continue
    }
    if (one.startsWith("-")) {
      at += 1
      continue
    }
    if (numbers < runner.numbered && NUMBER.test(one)) {
      numbers += 1
      at += 1
      continue
    }
    return at
  }
  return at
}

function calledOf(words: readonly string[]): readonly string[] {
  let at = 0
  for (;;) {
    while (ASSIGNMENT.test(words[at] ?? "")) at += 1
    const head = words[at]
    if (head === undefined) return []
    const runner = RUNNING_ANOTHER.get(basenameOf(head))
    if (runner === undefined) return words.slice(at)
    at = pastRunner(words, at + 1, runner)
  }
}

export function calledWords(segment: string): readonly string[] {
  return calledOf(wordsOf(segment))
}

function plainParameter(part: WordPart): string | null {
  if (part.type === "SimpleExpansion") return part.text.slice(1)
  if (part.type !== "ParameterExpansion") return null
  const bare =
    part.operator === undefined &&
    part.index === undefined &&
    part.slice === undefined &&
    part.replace === undefined &&
    part.length !== true &&
    part.indirect !== true
  return bare ? part.parameter : null
}

function partValue(part: WordPart, known: ReadonlyMap<string, string>): string {
  switch (part.type) {
    case "Literal":
    case "SingleQuoted":
    case "AnsiCQuoted":
      return part.value
    case "DoubleQuoted":
    case "LocaleString":
      return part.parts.map((one) => partValue(one, known)).join("")
    default: {
      const named = plainParameter(part)
      return (named === null ? undefined : known.get(named)) ?? part.text
    }
  }
}

function wordValue(word: Word, known: ReadonlyMap<string, string>): string {
  const value = word.parts?.map((one) => partValue(one, known)).join("") ?? word.value
  return value.startsWith("~") && !HOME.test(word.text) ? `./${value}` : value
}

function saidOf(value: string): Said {
  return { shown: value.replace(SPACE, SPACE_IN_A_WORD), value }
}

function wordSaid(word: Word, known: ReadonlyMap<string, string>): readonly Said[] {
  const only = word.parts?.length === 1 ? word.parts[0] : undefined
  const named = only === undefined ? null : plainParameter(only)
  const held = named === null ? undefined : known.get(named)
  if (held !== undefined) return wordsOf(held).map(saidOf)
  return [saidOf(wordValue(word, known))]
}

function redirectSaid(one: Redirect, known: ReadonlyMap<string, string>): Said {
  const target = one.target === undefined ? "" : wordValue(one.target, known)
  const descriptor = one.fileDescriptor === undefined ? "" : String(one.fileDescriptor)
  const said = saidOf(target)
  return {
    shown: `${descriptor}${one.operator}${said.shown}`,
    value: `${descriptor}${one.operator}${target}`,
  }
}

function fedBy(redirects: readonly Redirect[]): readonly string[] {
  return redirects
    .filter((one) => FED.includes(one.operator))
    .map((one) => (one.operator === "<<<" ? (one.target?.value ?? "") : (one.content ?? "")))
}

function callOf(said: readonly Said[], redirects: readonly Redirect[]): Call {
  return {
    segment: said.map((one) => one.shown).join(" "),
    handed: [...said.map((one) => one.value), ...fedBy(redirects)].join("\n"),
  }
}

function assignedOf(one: AssignmentPrefix, known: ReadonlyMap<string, string>): string {
  if (one.name === undefined || one.value === undefined) return one.text
  return `${one.name}${one.append === true ? "+=" : "="}${wordValue(one.value, known)}`
}

function heldIn(reading: Reading, command: Command): undefined {
  if (command.name !== undefined) return
  for (const one of command.prefix) {
    if (one.name === undefined || one.array !== undefined) continue
    const value = one.value === undefined ? "" : wordValue(one.value, reading.known)
    if (EXPANDED.test(value)) reading.known.delete(one.name)
    else reading.known.set(one.name, value)
  }
}

function scriptHandedTo(
  called: readonly Said[],
  redirects: readonly Redirect[]
): readonly string[] {
  const head = basenameOf(called[0]?.value ?? "")
  if (head === EVAL)
    return [
      called
        .slice(1)
        .map((one) => one.value)
        .join(" "),
    ]
  if (!SHELLS.includes(head)) return []
  const flag = called.findIndex((one, at) => at > 0 && RUNNING_A_STRING.test(one.value))
  if (flag < 0) return fedBy(redirects)
  const script = called.slice(flag + 1).find((one) => !FLAGGED.test(one.value))
  return script === undefined ? [] : [script.value]
}

function commandRead(reading: Reading, command: Command): undefined {
  const known = reading.known
  const words: Said[] = []
  for (const one of command.prefix) words.push(saidOf(assignedOf(one, known)))
  if (command.name !== undefined) words.push(...wordSaid(command.name, known))
  for (const one of command.suffix) words.push(...wordSaid(one, known))
  const kept = words.filter((one) => one.shown !== "")
  const called = kept.slice(kept.length - calledOf(kept.map((one) => one.shown)).length)
  const redirected = command.redirects.map((one) => redirectSaid(one, known))
  reading.calls.push(callOf([...kept, ...redirected], command.redirects))
  heldIn(reading, command)
  for (const one of command.prefix) if (one.value !== undefined) wordRead(reading, one.value)
  if (command.name !== undefined) wordRead(reading, command.name)
  for (const one of command.suffix) wordRead(reading, one)
  redirectsRead(reading, command.redirects)
  for (const one of scriptHandedTo(called, command.redirects)) textRead(reading, one)
}

function redirectsRead(reading: Reading, redirects: readonly Redirect[]): undefined {
  for (const one of redirects) {
    if (one.target !== undefined) wordRead(reading, one.target)
    if (one.body !== undefined) wordRead(reading, one.body)
  }
}

function besideRead(reading: Reading, redirects: readonly Redirect[]): undefined {
  if (redirects.length === 0) return
  const said = redirects.map((one) => redirectSaid(one, reading.known))
  reading.calls.push(callOf(said, redirects))
  redirectsRead(reading, redirects)
}

function wordRead(reading: Reading, word: Word): undefined {
  for (const one of word.parts ?? []) partRead(reading, one)
}

function partRead(reading: Reading, part: WordPart): undefined {
  switch (part.type) {
    case "CommandExpansion":
    case "ProcessSubstitution":
      if (part.script !== undefined) scriptRead(reading, part.script)
      return
    case "DoubleQuoted":
    case "LocaleString":
      for (const one of part.parts) partRead(reading, one)
      return
    case "ArithmeticExpansion":
      if (part.expression !== undefined) sumRead(reading, part.expression)
      return
    case "ExtendedGlob":
    case "BraceExpansion":
      for (const one of part.parts ?? []) partRead(reading, one)
      return
    case "ParameterExpansion":
      for (const one of part.indexParts ?? []) partRead(reading, one)
      for (const one of [part.operand, part.slice?.offset, part.slice?.length]) {
        if (one !== undefined) wordRead(reading, one)
      }
      if (part.replace !== undefined) {
        wordRead(reading, part.replace.pattern)
        wordRead(reading, part.replace.replacement)
      }
      return
    default:
      return
  }
}

function sumRead(reading: Reading, sum: ArithmeticExpression): undefined {
  switch (sum.type) {
    case "ArithmeticBinary":
      sumRead(reading, sum.left)
      sumRead(reading, sum.right)
      return
    case "ArithmeticUnary":
      sumRead(reading, sum.operand)
      return
    case "ArithmeticTernary":
      sumRead(reading, sum.test)
      sumRead(reading, sum.consequent)
      sumRead(reading, sum.alternate)
      return
    case "ArithmeticGroup":
      sumRead(reading, sum.expression)
      return
    case "ArithmeticWord":
      for (const one of sum.parts ?? []) partRead(reading, one)
      return
    case "ArithmeticCommandExpansion":
      if (sum.script !== undefined) scriptRead(reading, sum.script)
      return
    default:
      return
  }
}

function testRead(reading: Reading, test: TestExpression): undefined {
  switch (test.type) {
    case "TestUnary":
      wordRead(reading, test.operand)
      return
    case "TestBinary":
      wordRead(reading, test.left)
      wordRead(reading, test.right)
      return
    case "TestLogical":
      testRead(reading, test.left)
      testRead(reading, test.right)
      return
    case "TestNot":
      testRead(reading, test.operand)
      return
    case "TestGroup":
      testRead(reading, test.expression)
      return
    default:
      return
  }
}

function statementsRead(reading: Reading, statements: readonly Statement[]): undefined {
  for (const one of statements) nodeRead(reading, one)
}

function nodeRead(reading: Reading, node: Node): undefined {
  switch (node.type) {
    case "Command":
      commandRead(reading, node)
      return
    case "Statement":
      nodeRead(reading, node.command)
      besideRead(reading, node.redirects)
      return
    case "Pipeline":
    case "AndOr":
      for (const one of node.commands) nodeRead(reading, one)
      return
    case "CompoundList":
      statementsRead(reading, node.commands)
      return
    case "Subshell":
    case "BraceGroup":
      statementsRead(reading, node.body.commands)
      return
    case "If":
      statementsRead(reading, node.clause.commands)
      statementsRead(reading, node.then.commands)
      if (node.else !== undefined) nodeRead(reading, node.else)
      return
    case "While":
      statementsRead(reading, node.clause.commands)
      statementsRead(reading, node.body.commands)
      return
    case "For":
    case "Select":
      for (const one of node.wordlist) wordRead(reading, one)
      statementsRead(reading, node.body.commands)
      return
    case "ArithmeticFor":
      for (const one of [node.initialize, node.test, node.update]) {
        if (one !== undefined) sumRead(reading, one)
      }
      statementsRead(reading, node.body.commands)
      return
    case "Case":
      wordRead(reading, node.word)
      for (const item of node.items) {
        for (const one of item.pattern) wordRead(reading, one)
        statementsRead(reading, item.body.commands)
      }
      return
    case "Function":
    case "Coproc":
      nodeRead(reading, node.body)
      besideRead(reading, node.redirects)
      return
    case "TestCommand":
      testRead(reading, node.expression)
      return
    case "ArithmeticCommand":
      if (node.expression !== undefined) sumRead(reading, node.expression)
      return
    default:
      return
  }
}

function scriptRead(reading: Reading, script: ParsedScript): undefined {
  for (const one of script.errors ?? []) reading.unread.push(one.message)
  statementsRead(reading, script.commands)
}

function textRead(reading: Reading, text: string): undefined {
  const before = reading.unread.length
  scriptRead(reading, parse(text))
  if (reading.unread.length === before) return
  const lines = text.split(LINE)
  if (lines.length < 2) return
  for (const one of lines) textRead(reading, one)
}

function readingOf(command: string): Reading {
  const reading: Reading = { calls: [], unread: [], known: new Map() }
  textRead(reading, command)
  return reading
}

export function callsIn(command: string): readonly Call[] {
  return readingOf(command).calls
}

export function segmentsOf(command: string): readonly string[] {
  return callsIn(command)
    .map((one) => one.segment)
    .filter((one) => one !== "")
}
