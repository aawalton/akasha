import { basenameOf, segmentsOf, wordsOf } from "./shell-calls.module.code.ts"

const BUN = "bun"

const ASSIGNMENT = /^[A-Za-z_][A-Za-z0-9_]*=/

const SETTING_UP: readonly string[] = ["sudo", "env"]

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
  readonly verb: string
  readonly rest: readonly string[]
}

export function bunCallIn(segment: string): BunCall | null {
  const words = wordsOf(segment).filter(
    (one) => !ASSIGNMENT.test(one) && !SETTING_UP.includes(one)
  )
  const head = words[0]
  if (head === undefined || basenameOf(head) !== BUN) return null
  const after = words.slice(1)
  let at = 0
  while (at < after.length) {
    const one = after[at] ?? ""
    if (TAKES_A_VALUE.includes(one)) {
      at += 2
      continue
    }
    if (!one.startsWith("-")) break
    at += 1
  }
  const verb = after[at]
  return verb === undefined ? null : { verb, rest: after.slice(at + 1) }
}

export function bunCallsIn(command: string): readonly BunCall[] {
  return segmentsOf(command)
    .map(bunCallIn)
    .filter((one): one is BunCall => one !== null)
}
