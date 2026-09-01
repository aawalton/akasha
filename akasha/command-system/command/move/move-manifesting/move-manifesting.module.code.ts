import { dirname, join } from "node:path"

const MANIFEST = "package.json"

const EXPORTS = "exports"

const AKASHA = "akasha"

const INSIDE = `${AKASHA}/`

const OPENING = "./"

export function manifestsOver(
  moved: ReadonlyMap<string, string>,
  there: (path: string) => boolean
): readonly string[] {
  const found = new Set<string>()
  for (const path of moved.keys()) {
    let dir = dirname(path)
    while (dir === AKASHA || dir.startsWith(INSIDE)) {
      const at = join(dir, MANIFEST)
      if (!moved.has(at) && there(at)) found.add(at)
      dir = dirname(dir)
    }
  }
  return [...found].sort()
}

function landingFor(
  folder: string,
  value: string,
  moved: ReadonlyMap<string, string>
): string | null {
  const arrived = moved.get(join(folder, value))
  if (arrived === undefined) return null
  const under = `${folder}/`
  if (!arrived.startsWith(under)) return null
  return `${OPENING}${arrived.slice(under.length)}`
}

function stated(value: Record<string, unknown>): string {
  return `${JSON.stringify(value, null, 2)}\n`
}

export function repointedIn(
  folder: string,
  text: string,
  moved: ReadonlyMap<string, string>
): string | null {
  let read: unknown
  try {
    read = JSON.parse(text)
  } catch {
    return null
  }
  if (read === null || typeof read !== "object") return null
  const held = read as Record<string, unknown>
  const said = held[EXPORTS]
  if (typeof said === "string") {
    const next = landingFor(folder, said, moved)
    return next === null ? null : stated({ ...held, [EXPORTS]: next })
  }
  if (said === null || typeof said !== "object") return null
  const found: Record<string, unknown> = {}
  let changed = false
  for (const [key, one] of Object.entries(said as Record<string, unknown>)) {
    const next = typeof one === "string" ? landingFor(folder, one, moved) : null
    if (next === null) {
      found[key] = one
      continue
    }
    found[key] = next
    changed = true
  }
  return changed ? stated({ ...held, [EXPORTS]: found }) : null
}

export function manifestingOver(
  moved: ReadonlyMap<string, string>,
  bodyText: (path: string) => string | null
): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const at of manifestsOver(moved, (path) => bodyText(path) !== null)) {
    const text = bodyText(at)
    if (text === null) continue
    const next = repointedIn(dirname(at), text, moved)
    if (next !== null && next !== text) found.set(at, next)
  }
  return found
}
