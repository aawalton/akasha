import { basenameOf, segmentsOf, wordsOf } from "../shell-calls/shell-calls.module.code.ts"

const ASSIGNMENT = /^[A-Za-z_][A-Za-z0-9_]*=/

const GIT = "git"

const SETTING_UP: readonly string[] = ["sudo", "env"]

const TAKES_A_VALUE: readonly string[] = [
  "-c",
  "-C",
  "--git-dir",
  "--work-tree",
  "--namespace",
  "--super-prefix",
  "--exec-path",
]

const NOT_GIT: readonly string[] = ["kubectl", "ssh"]

export type GitCall = {
  readonly verb: string
  readonly rest: readonly string[]
}

export function gitCallIn(segment: string): GitCall | null {
  let head = ""
  let verb = ""
  const rest: string[] = []
  let reading = "head"
  let skipNext = false
  for (const word of wordsOf(segment)) {
    if (reading === "head") {
      if (ASSIGNMENT.test(word)) continue
      if (SETTING_UP.includes(word)) continue
      head = word
      reading = "flags"
      continue
    }
    if (reading === "flags") {
      if (skipNext) {
        skipNext = false
        continue
      }
      if (TAKES_A_VALUE.includes(word)) {
        skipNext = true
        continue
      }
      if (word.startsWith("-")) continue
      verb = word
      reading = "rest"
      continue
    }
    rest.push(word)
  }
  const base = basenameOf(head)
  if (NOT_GIT.includes(base)) return null
  if (base !== GIT) return null
  if (verb === "") return null
  return { verb, rest }
}

export function gitCallsIn(command: string): readonly GitCall[] {
  const found: GitCall[] = []
  for (const segment of segmentsOf(command)) {
    const call = gitCallIn(segment)
    if (call !== null) found.push(call)
  }
  return found
}
