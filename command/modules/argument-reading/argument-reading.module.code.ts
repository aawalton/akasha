import { z } from "zod"

const SCALAR = /^([a-z][a-z0-9-]*): ?(.*)$/

const SCALAR_FOUND = z.tuple([z.string(), z.string(), z.string()])

const OPENS = /^([a-z][a-z0-9-]*) (\S+)( no-newline)?$/

const OPENED_FOUND = z.tuple([
  z.string(),
  z.string(),
  z.string(),
  z.literal(" no-newline").optional(),
])

export type Given = Readonly<Record<string, string>>

type Fenced = Readonly<Record<string, boolean>>

type Read = { readonly given: Given; readonly fenced: Fenced } | { readonly refused: string }

function twice(key: string): string {
  return `\`${key}\` is written twice, and one reading holds one value for a key`
}

function unclosed(key: string, fence: string): string {
  return `\`${key}\` opens a body with \`${fence}\`, and no later line is \`${fence}\` alone`
}

function neither(at: number, line: string): string {
  return `line ${String(at)} is neither \`key: value\` nor \`key <fence>\` — ${line}`
}

function unlinedPassage(key: string): string {
  return (
    `\`${key}\` is a passage, and a passage always drops the newline its fence leaves, so` +
    ` \`no-newline\` is refused on it — open \`${key}\` without it, and end the passage with a` +
    " blank line where it takes the newline after it"
  )
}

export function passagesIn(
  given: Given,
  fenced: Fenced,
  passages: readonly string[]
): Given | string {
  const held: Record<string, string> = { ...given }
  for (const key of passages) {
    const lined = fenced[key]
    if (lined === undefined) continue
    if (!lined) return unlinedPassage(key)
    const said = held[key]
    if (said?.endsWith("\n") === true) held[key] = said.slice(0, -1)
  }
  return held
}

export function readingIn(text: string): Read {
  const given: Record<string, string> = {}
  const fenced: Record<string, boolean> = {}
  const lines = text.split("\n")
  let at = 0
  while (at < lines.length) {
    const line = lines[at]
    at += 1
    if (line === undefined) break
    if (line.trim() === "") continue
    const scalar = SCALAR_FOUND.safeParse(SCALAR.exec(line))
    if (scalar.success) {
      const [, key, value] = scalar.data
      if (key in given) return { refused: twice(key) }
      given[key] = value
      continue
    }
    const opened = OPENED_FOUND.safeParse(OPENS.exec(line))
    if (!opened.success) return { refused: neither(at, line) }
    const [, key, fence, unlined] = opened.data
    const lined = unlined === undefined
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
    fenced[key] = lined
  }
  return { given, fenced }
}
