import { join } from "node:path"

const NAME = "name"

const EXPORTS = "exports"

const ITSELF = "."

const OPENING = "./"

const PARTED_BY = "/"

function specifierFor(named: string, key: string): string | null {
  if (key === ITSELF) return named
  if (!key.startsWith(OPENING)) return null
  return `${named}${PARTED_BY}${key.slice(OPENING.length)}`
}

export function reachesIn(folder: string, text: string): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  let read: unknown
  try {
    read = JSON.parse(text)
  } catch {
    return found
  }
  if (read === null || typeof read !== "object") return found
  const held = read as Record<string, unknown>
  const named = held[NAME]
  if (typeof named !== "string") return found
  const said = held[EXPORTS]
  if (typeof said === "string") {
    found.set(named, join(folder, said))
    return found
  }
  if (said === null || typeof said !== "object") return found
  for (const [key, one] of Object.entries(said as Record<string, unknown>)) {
    if (typeof one !== "string") continue
    const specifier = specifierFor(named, key)
    if (specifier === null) continue
    found.set(specifier, join(folder, one))
  }
  return found
}

export function reachingOver(
  held: Iterable<ReadonlyMap<string, string>>
): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const one of held) {
    for (const [specifier, path] of one) {
      if (found.has(specifier)) continue
      found.set(specifier, path)
    }
  }
  return found
}
