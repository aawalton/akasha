const NOT_LETTERS = /[^A-Za-z]/g

const YES = "YES"

export function opensYes(answer: string): boolean {
  return answer.replace(NOT_LETTERS, "").toUpperCase().startsWith(YES)
}
