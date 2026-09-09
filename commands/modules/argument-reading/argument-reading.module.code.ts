const SCALAR = /^([a-z][a-z0-9-]*): ?(.*)$/

const OPENS = /^([a-z][a-z0-9-]*) (\S+)( no-newline)?$/

export type Given = Readonly<Record<string, string>>

export type Read = { readonly given: Given } | { readonly refused: string }

function twice(key: string): string {
  return `\`${key}\` is written twice, and one reading holds one value for a key`
}

function unclosed(key: string, fence: string): string {
  return `\`${key}\` opens a body with \`${fence}\`, and no later line is \`${fence}\` alone`
}

function neither(at: number, line: string): string {
  return `line ${String(at)} is neither \`key: value\` nor \`key <fence>\` — ${line}`
}

export function readingIn(text: string): Read {
  const given: Record<string, string> = {}
  const lines = text.split("\n")
  let at = 0
  while (at < lines.length) {
    const line = lines[at]
    at += 1
    if (line === undefined) break
    if (line.trim() === "") continue
    const scalar = SCALAR.exec(line)
    if (scalar !== null) {
      const key = scalar[1] as string
      if (key in given) return { refused: twice(key) }
      given[key] = scalar[2] as string
      continue
    }
    const opened = OPENS.exec(line)
    if (opened === null) return { refused: neither(at, line) }
    const key = opened[1] as string
    const fence = opened[2] as string
    const lined = opened[3] === undefined
    if (key in given) return { refused: twice(key) }
    const held: string[] = []
    let closed = false
    while (at < lines.length) {
      const one = lines[at]
      at += 1
      if (one === fence) {
        closed = true
        break
      }
      held.push(`${one ?? ""}\n`)
    }
    if (!closed) return { refused: unclosed(key, fence) }
    const body = held.join("")
    given[key] = lined ? body : body.slice(0, -1)
  }
  return { given }
}
