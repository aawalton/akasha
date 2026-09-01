import { basenameOf, calledWords, segmentsOf } from "../shell-calls/shell-calls.module.code.ts"

const GIT = "git"

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
  readonly act: string
  readonly rest: readonly string[]
}

export function gitCallIn(segment: string): GitCall | null {
  const words = calledWords(segment)
  const head = words[0]
  if (head === undefined) return null
  const base = basenameOf(head)
  if (NOT_GIT.includes(base)) return null
  if (base !== GIT) return null
  let act = ""
  const rest: string[] = []
  let skipNext = false
  for (const word of words.slice(1)) {
    if (act !== "") {
      rest.push(word)
      continue
    }
    if (skipNext) {
      skipNext = false
      continue
    }
    if (TAKES_A_VALUE.includes(word)) {
      skipNext = true
      continue
    }
    if (word.startsWith("-")) continue
    act = word
  }
  if (act === "") return null
  return { act, rest }
}

export function gitCallsIn(command: string): readonly GitCall[] {
  const found: GitCall[] = []
  for (const segment of segmentsOf(command)) {
    const call = gitCallIn(segment)
    if (call !== null) found.push(call)
  }
  return found
}
