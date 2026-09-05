import { repointed } from "@akasha/code-system/path-repointing"
import { importingOf } from "../../../../pages/indexes/path-naming/path-naming.module.code.ts"

export type Asked = {
  readonly from: string
  readonly to: string
}

export type Moved = {
  readonly from: string
  readonly to: string
}

export type Renamed = {
  readonly moved: Moved | null
  readonly bodies: ReadonlyMap<string, string> | null
  readonly refused: string | null
}

function refusing(why: string): Renamed {
  return { moved: null, bodies: null, refused: why }
}

export function renamePath(
  root: string,
  given: Asked,
  textOf: (path: string) => string | null
): Renamed {
  if (given.from === given.to) return refusing(`\`${given.to}\` is the path it already sits at`)
  const text = textOf(given.from)
  if (text === null) return refusing(`\`${given.from}\` could not be read`)
  if (textOf(given.to) !== null) return refusing(`\`${given.to}\` is a body already`)
  const moved = new Map([[given.from, given.to]])
  const reading = importingOf(root, moved)
  if ("unread" in reading) return refusing(reading.unread)
  const bodies = new Map<string, string>()
  bodies.set(given.to, repointed(given.from, given.to, text, moved))
  for (const path of reading.importers) {
    const held = textOf(path)
    if (held === null) return refusing(`\`${path}\` names what moved and could not be read`)
    const next = repointed(path, path, held, moved)
    if (next !== held) bodies.set(path, next)
  }
  return { moved: { from: given.from, to: given.to }, bodies, refused: null }
}
