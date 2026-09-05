import { existsSync, statSync } from "node:fs"
import { basename, dirname, join } from "node:path"
import { pageTypesIn } from "@akasha/indexes/entries"
import { besideOf } from "@akasha/pages-system/page-beside"
import {
  pageNamed,
  pageOf,
  partedIn,
  sectionedIn,
  uncommittedHeld,
} from "@akasha/pages-system/page-file-name"
import { pathAt } from "../../write/write.command.code.ts"
import { namingOf } from "../naming/move-naming.module.code.ts"
import type { Renaming } from "../renaming/move-renaming.module.code.ts"
import { besideRenamed, renamingFor } from "../renaming/move-renaming.module.code.ts"
import type { Pair } from "../spreading/move-spreading.module.code.ts"

const TS = ".ts"

export type Kind = "own" | "beside" | "stray"

export type Named = { readonly types: ReadonlySet<string> } | { readonly unread: string }

export type Sided = {
  readonly from: string
  readonly to: string
  readonly named: boolean
  readonly committed: boolean
  readonly renaming: Renaming | null
}

export function kindOf(path: string, pageTypes: ReadonlySet<string>): Kind {
  if (pageNamed(path, pageTypes)) return "own"
  const said = partedIn(path)
  if (said === null || !pageTypes.has(said.pageType)) return "stray"
  if (said.sections.length === 0) return "stray"
  return sectionedIn(said) === null ? "stray" : "beside"
}

export function pageBeside(path: string): string {
  const said = partedIn(path)
  return said === null ? path : join(dirname(path), `${pageOf(said)}${TS}`)
}

function typesFor(root: string): Named {
  try {
    return { types: pageTypesIn(root) }
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return { unread: `${why}, so what a page type is could not be answered` }
  }
}

export function sidedIn(
  root: string,
  pairs: readonly Pair[]
): { readonly sides: readonly Sided[] } | { readonly refusals: readonly string[] } {
  const refusals: string[] = []
  const sides: Sided[] = []
  const seen = new Set<string>()
  const taken = new Set<string>()
  let read: Named | null = null
  const typesAsked = (): Named => {
    read ??= typesFor(root)
    return read
  }
  for (const one of pairs) {
    const from = pathAt(root, one.from)
    const to = pathAt(root, one.to)
    if (from === null || to === null) {
      const outside = from === null ? one.from : one.to
      refusals.push(
        `\`${outside}\` is no path inside the repository — a path is read against the repository ` +
          "root, and this carries nothing in or out of the repository"
      )
      continue
    }
    if (from === to) {
      refusals.push(
        `${from} is named as both sides of a pair, so this pair asks for no move at all`
      )
      continue
    }
    if (!existsSync(join(root, from))) {
      refusals.push(`${from} is not there, so there is no body to carry`)
      continue
    }
    if (!statSync(join(root, from)).isFile()) {
      refusals.push(`${from} is not a file — a move carries bodies, and a directory holds none`)
      continue
    }
    if (existsSync(join(root, to))) {
      refusals.push(`${to} already stands, and a move writes over nothing`)
      continue
    }
    let renaming: Renaming | null = null
    let kind: Kind | null = null
    if (basename(from) !== basename(to)) {
      const named = typesAsked()
      if ("unread" in named) {
        refusals.push(named.unread)
        continue
      }
      kind = kindOf(from, named.types)
      if (kind === "beside") {
        refusals.push(
          `${from} is a file \`${pageBeside(from)}\` claims beside it, and its name is what ` +
            "makes that claim"
        )
        continue
      }
      if (kind === "own") {
        const naming = namingOf(root, from)
        if ("unread" in naming) {
          refusals.push(naming.unread)
          continue
        }
        const held = naming.held
        if (held === null || held.path !== from) {
          refusals.push(
            `${from} is a page's own file the index answers no page for, so the slug a new ` +
              "name would rename is unread"
          )
          continue
        }
        const asked = renamingFor(from, to, held.id)
        if ("refused" in asked) {
          refusals.push(asked.refused)
          continue
        }
        renaming = asked.renaming
      }
    }
    if (seen.has(from)) {
      refusals.push(`${from} is named as the source of more than one pair`)
      continue
    }
    if (taken.has(to)) {
      refusals.push(`${to} is named as the destination of more than one pair`)
      continue
    }
    seen.add(from)
    taken.add(to)
    sides.push({ from, to, named: true, committed: true, renaming })
    const beside = besideOf(root, from)
    if (beside.length === 0) continue
    if (kind === null) {
      const named = typesAsked()
      if ("unread" in named) {
        refusals.push(named.unread)
        continue
      }
      kind = kindOf(from, named.types)
    }
    if (kind !== "own") continue
    for (const held of beside) {
      if (seen.has(held)) continue
      seen.add(held)
      const name = basename(held)
      const there = join(dirname(to), renaming === null ? name : besideRenamed(name, renaming))
      if (existsSync(join(root, there))) {
        refusals.push(`${there} already stands, and the sidecar ${held} goes with what you named`)
        continue
      }
      taken.add(there)
      sides.push({
        from: held,
        to: there,
        named: false,
        committed: !uncommittedHeld(held),
        renaming,
      })
    }
  }
  if (refusals.length > 0) return { refusals }
  return { sides }
}
