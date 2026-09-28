import { basename, dirname, isAbsolute, join } from "node:path"
import {
  everyOfType,
  type Listed,
  listedAt,
  readingIn,
  slugFoldersOf,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { uncommittedAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { uncommittedIn } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import type { Narrowed } from "akasha/page/service/modules/follow-narrowing/follow-narrowing.module.code.ts"
import {
  COMPUTED,
  carriedBeside,
} from "akasha/page/service/modules/kinds-gathering/kinds-gathering.module.code.ts"
import {
  type Kept,
  keptIn,
} from "akasha/page/service/modules/reads-keeping/reads-keeping.module.code.ts"

export type Held = {
  readonly key: string
  readonly kinds: ReadonlySet<string>
  readonly slugs: ReadonlySet<string> | null
  readonly narrowed?: Narrowed
}

type Heard = {
  readonly folder: string
  readonly name: string | null
  readonly kind: string
  readonly slugs: ReadonlySet<string> | null
}

type Target = {
  readonly kind: string
  readonly slugs: ReadonlySet<string> | null
}

type Aimed = ReadonlyMap<string, ReadonlyMap<string | null, readonly (readonly Target[])[]>>

export type Planned = {
  readonly pages: ReadonlySet<string>
  readonly listed: ReadonlyMap<string, string>
  readonly read: Aimed
  readonly keeping: ReadonlyMap<string, ReadonlySet<string>>
}

export function pagesOf(
  given: string | Reading,
  kind: string,
  slugs: ReadonlySet<string> | null
): readonly Listed[] {
  if (slugs === null) return everyOfType(given, kind)
  return [...slugs].flatMap((slug) => listedAt(given, kind, slug))
}

function fullAt(root: string, at: string): string {
  return isAbsolute(at) ? at : join(root, at)
}

export function heardOf(
  root: string,
  kind: string,
  slugs: ReadonlySet<string> | null,
  kept: Kept
): readonly Heard[] {
  return [
    ...kept.files.map((one) => ({
      folder: dirname(fullAt(root, one)),
      name: basename(one),
      kind,
      slugs,
    })),
    ...kept.folders.map((one) => ({ folder: fullAt(root, one), name: null, kind, slugs })),
  ]
}

type Keep = { readonly at: string; readonly kept: Kept }

function keepsOf(
  root: string,
  reading: Reading,
  kind: string,
  seen: Map<string, Kept>
): readonly Keep[] {
  const found: Keep[] = []
  for (const one of carriedBeside(reading, kind) ?? []) {
    if (one.pageTypeSlug !== COMPUTED) continue
    const page = listedAt(reading, COMPUTED, one.pagePropertySlug)[0]
    const at = page === undefined ? null : uncommittedAt(page.path)
    if (page === undefined || at === null) continue
    const kept = seen.get(at) ?? keptIn(uncommittedIn(root, page.path))
    seen.set(at, kept)
    found.push({ at, kept })
  }
  return found
}

type Aim = { readonly kept: Kept; readonly targets: Target[]; readonly kinds: Set<string> }

function aimedOver(root: string, aims: Iterable<Aim>): Aimed {
  const read = new Map<string, Map<string | null, (readonly Target[])[]>>()
  for (const aim of aims) {
    for (const one of heardOf(root, "", null, aim.kept)) {
      const names = read.get(one.folder) ?? new Map<string | null, (readonly Target[])[]>()
      read.set(one.folder, names)
      const held = names.get(one.name) ?? []
      names.set(one.name, held)
      held.push(aim.targets)
    }
  }
  return read
}

export function plannedFor(root: string, helds: readonly Held[]): Planned {
  const pages = new Set<string>()
  const listed = new Map<string, string>()
  const aims = new Map<string, Aim>()
  const seen = new Map<string, Kept>()
  const keeping = new Map<string, Set<string>>()
  const reading = readingIn(root)
  const keeps = new Map<string, readonly Keep[]>()
  for (const held of helds) {
    for (const kind of held.kinds) {
      for (const one of pagesOf(reading, kind, held.slugs)) {
        pages.add(dirname(join(root, one.path)))
      }
      try {
        const kept = keeps.get(kind) ?? keepsOf(root, reading, kind, seen)
        keeps.set(kind, kept)
        for (const one of kept) {
          const folder = dirname(join(root, one.at))
          const names = keeping.get(folder) ?? new Set<string>()
          names.add(basename(one.at))
          keeping.set(folder, names)
          const aim = aims.get(one.at) ?? { kept: one.kept, targets: [], kinds: new Set<string>() }
          aims.set(one.at, aim)
          if (held.slugs !== null) aim.targets.push({ kind, slugs: held.slugs })
          else if (!aim.kinds.has(kind)) {
            aim.kinds.add(kind)
            aim.targets.push({ kind, slugs: null })
          }
        }
      } catch {}
      if (held.slugs !== null) continue
      for (const at of slugFoldersOf(reading, kind)) listed.set(join(root, at), kind)
    }
  }
  return { pages, listed, read: aimedOver(root, aims.values()), keeping }
}
