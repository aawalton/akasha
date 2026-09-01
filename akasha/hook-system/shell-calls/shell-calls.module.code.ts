const SINGLE_QUOTED = /'([^']*)'/g

const DOUBLE_QUOTED = /"([^"]*)"/g

const BARE_WORD = /^[^\s|;&<>()`$]+$/

const SEPARATOR = /[|;&]{1,2}/g

const LEADING_SPACE = /^\s+/

const CONTINUED = /\\\n/g

const ASSIGNMENT = /^[A-Za-z_][A-Za-z0-9_]*=/

const NUMBER = /^[0-9]/

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

export function joinedContinuations(command: string): string {
  return command.replace(CONTINUED, " ")
}

function kept(_whole: string, inside: string): string {
  return BARE_WORD.test(inside) ? inside : ""
}

export function dequoted(command: string): string {
  return command.replace(SINGLE_QUOTED, kept).replace(DOUBLE_QUOTED, kept)
}

export function segmentsOf(command: string): readonly string[] {
  return dequoted(joinedContinuations(command))
    .split("\n")
    .map((line) => line.replace(SEPARATOR, "\n"))
    .join("\n")
    .split("\n")
    .map((segment) => segment.replace(LEADING_SPACE, ""))
    .filter((segment) => segment !== "")
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

export function calledWords(segment: string): readonly string[] {
  const words = wordsOf(segment)
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
