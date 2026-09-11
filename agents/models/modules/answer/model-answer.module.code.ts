const NOT_LETTERS = /[^A-Za-z]/g

const YES = "YES"

export function opensYes(answer: string): boolean {
  return answer.replace(NOT_LETTERS, "").toUpperCase().startsWith(YES)
}

export function endsYes(answer: string): boolean {
  const lines = answer.split("\n").filter((line) => line.trim() !== "")
  const last = lines[lines.length - 1]
  return last !== undefined && last.replace(NOT_LETTERS, "").toUpperCase() === YES
}
