const SINGLE_QUOTED = /'([^']*)'/g

const DOUBLE_QUOTED = /"([^"]*)"/g

const BARE_WORD = /^[^\s|;&<>()`$]+$/

const SEPARATOR = /[|;&]{1,2}/g

const LEADING_SPACE = /^\s+/

const CONTINUED = /\\\n/g

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
