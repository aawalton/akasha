import { dirname, join } from "node:path"

const MANIFEST = "package.json"

const EXPORTS = "exports"

const HERE = "."

const OPENING = "./"

export type Manifesting = {
  readonly at: string
  readonly folder: string
  readonly arriving: string
}

export type Restating = {
  readonly at: string
  readonly to: string
  readonly text: string
}

export function manifestsOver(
  moved: ReadonlyMap<string, string>,
  there: (path: string) => boolean
): readonly Manifesting[] {
  const found = new Map<string, Manifesting>()
  for (const path of moved.keys()) {
    let dir: string | null = dirname(path)
    while (dir !== null) {
      const at = join(dir, MANIFEST)
      if (!found.has(at) && there(at)) {
        found.set(at, { at, folder: dir, arriving: dirname(moved.get(at) ?? at) })
      }
      dir = dir === HERE ? null : dirname(dir)
    }
  }
  return [...found.values()].sort((one, two) => (one.at < two.at ? -1 : 1))
}

type Landing = { readonly said: string } | { readonly gone: true }

function landingFor(held: Manifesting, value: string, moved: ReadonlyMap<string, string>): Landing {
  const was = join(held.folder, value)
  const arrived = moved.get(was) ?? was
  const under = held.arriving === HERE ? "" : `${held.arriving}/`
  if (!arrived.startsWith(under)) return { gone: true }
  return { said: `${OPENING}${arrived.slice(under.length)}` }
}

function stated(value: Record<string, unknown>): string {
  return `${JSON.stringify(value, null, 2)}\n`
}

function without(value: Record<string, unknown>, key: string): Record<string, unknown> {
  const found: Record<string, unknown> = {}
  for (const [one, held] of Object.entries(value)) {
    if (one !== key) found[one] = held
  }
  return found
}

function saidOver(
  held: Manifesting,
  said: Record<string, unknown>,
  moved: ReadonlyMap<string, string>
): Record<string, unknown> | null {
  const found: Record<string, unknown> = {}
  let changed = false
  for (const [key, one] of Object.entries(said)) {
    if (typeof one !== "string") {
      found[key] = one
      continue
    }
    const landing = landingFor(held, one, moved)
    if ("gone" in landing) {
      changed = true
      continue
    }
    found[key] = landing.said
    if (landing.said !== one) changed = true
  }
  return changed ? found : null
}

export function repointedIn(
  held: Manifesting,
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
  const value = read as Record<string, unknown>
  const said = value[EXPORTS]
  if (typeof said === "string") {
    const landing = landingFor(held, said, moved)
    if ("gone" in landing) return stated(without(value, EXPORTS))
    return landing.said === said ? null : stated({ ...value, [EXPORTS]: landing.said })
  }
  if (said === null || typeof said !== "object") return null
  const found = saidOver(held, said as Record<string, unknown>, moved)
  return found === null ? null : stated({ ...value, [EXPORTS]: found })
}

export function manifestingOver(
  moved: ReadonlyMap<string, string>,
  bodyText: (path: string) => string | null
): readonly Restating[] {
  const found: Restating[] = []
  for (const held of manifestsOver(moved, (path) => bodyText(path) !== null)) {
    const text = bodyText(held.at)
    if (text === null) continue
    const next = repointedIn(held, text, moved)
    if (next === null || next === text) continue
    found.push({ at: held.at, to: moved.get(held.at) ?? held.at, text: next })
  }
  return found
}
