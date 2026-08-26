export type Source = {
  readonly repo: string
  readonly key: string
}

export type Named = Source & {
  readonly at: string
}

export function saidSource(one: Source): string {
  return `${one.repo}:${one.key}`
}

export function saidNamed(one: Named): string {
  return `${one.at}\t${saidSource(one)}`
}

export function lineOf(one: Source): string {
  return JSON.stringify({ repo: one.repo, key: one.key })
}

export function namedLineOf(one: Named): string {
  return JSON.stringify({ at: one.at, repo: one.repo, key: one.key })
}

function readOne(line: string): Source | null {
  let held: unknown = null
  try {
    held = JSON.parse(line)
  } catch {
    return null
  }
  if (held === null || typeof held !== "object") return null
  const { repo, key } = held as { repo?: unknown; key?: unknown }
  if (typeof repo !== "string" || typeof key !== "string") return null
  return { repo, key }
}

function readNamed(line: string): Named | null {
  const one = readOne(line)
  if (one === null) return null
  let held: unknown = null
  try {
    held = JSON.parse(line)
  } catch {
    return null
  }
  const { at } = held as { at?: unknown }
  if (typeof at !== "string" || at === "") return null
  return { at, repo: one.repo, key: one.key }
}

export function sourcesOf(body: string): readonly Source[] {
  const found: Source[] = []
  const seen = new Set<string>()
  for (const line of body.split("\n")) {
    if (line === "") continue
    const one = readOne(line)
    if (one === null) continue
    const said = saidSource(one)
    if (seen.has(said)) continue
    seen.add(said)
    found.push(one)
  }
  return found
}

export function namedOf(body: string): readonly Named[] {
  const found: Named[] = []
  const seen = new Set<string>()
  for (const line of body.split("\n")) {
    if (line === "") continue
    const one = readNamed(line)
    if (one === null) continue
    const said = saidNamed(one)
    if (seen.has(said)) continue
    seen.add(said)
    found.push(one)
  }
  return found
}

export function bodyOf(sources: Iterable<Source>): string {
  const lines: string[] = []
  for (const one of sources) lines.push(lineOf(one))
  return lines.length === 0 ? "" : `${lines.join("\n")}\n`
}

export function namedBodyOf(held: Iterable<Named>): string {
  const lines: string[] = []
  for (const one of held) lines.push(namedLineOf(one))
  return lines.length === 0 ? "" : `${lines.join("\n")}\n`
}
