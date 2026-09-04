import { basenameOf, calledWords, segmentsOf } from "../shell-calls/shell-calls.module.code.ts"

const BUN = "bun"

const RUN = "run"

const TAKES_A_VALUE: readonly string[] = [
  "-c",
  "--config",
  "--cwd",
  "--env-file",
  "-r",
  "--preload",
  "-d",
  "--define",
  "-l",
  "--loader",
  "--tsconfig-override",
]

export type BunCall = {
  readonly act: string
  readonly rest: readonly string[]
}

function pastFlags(words: readonly string[]): readonly string[] {
  let at = 0
  while (at < words.length) {
    const one = words[at] ?? ""
    if (TAKES_A_VALUE.includes(one)) {
      at += 2
      continue
    }
    if (!one.startsWith("-")) break
    at += 1
  }
  return words.slice(at)
}

export function bunCallIn(segment: string): BunCall | null {
  const words = calledWords(segment)
  const head = words[0]
  if (head === undefined || basenameOf(head) !== BUN) return null
  const after = pastFlags(words.slice(1))
  const act = after[0]
  return act === undefined ? null : { act, rest: after.slice(1) }
}

export function scriptOf(call: BunCall): string | null {
  if (call.act !== RUN) return null
  return pastFlags(call.rest)[0] ?? null
}

export function bunCallsIn(command: string): readonly BunCall[] {
  return segmentsOf(command)
    .map(bunCallIn)
    .filter((one): one is BunCall => one !== null)
}
