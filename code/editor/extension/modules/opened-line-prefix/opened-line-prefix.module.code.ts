const INDENT = /^[ \t]*/

const NUMBERED = /^(\d+)([.)])([ \t]+)/

const BULLET = /^([-*+])([ \t]+)/

function indentOf(line: string): string {
  const found = INDENT.exec(line)
  return found === null ? "" : found[0]
}

function endsTheList(rest: string, marked: number): boolean {
  return rest.slice(marked).trim() === ""
}

export function openedLinePrefix(line: string): string {
  const indent = indentOf(line)
  const rest = line.slice(indent.length)
  const numbered = NUMBERED.exec(rest)
  if (numbered !== null) {
    if (endsTheList(rest, numbered[0].length)) {
      return indent
    }
    const counted = Number(numbered[1] ?? "0") + 1
    return `${indent}${String(counted)}${numbered[2] ?? ""}${numbered[3] ?? ""}`
  }
  const bullet = BULLET.exec(rest)
  if (bullet !== null) {
    if (endsTheList(rest, bullet[0].length)) {
      return indent
    }
    return `${indent}${bullet[1] ?? ""}${bullet[2] ?? ""}`
  }
  return indent
}
