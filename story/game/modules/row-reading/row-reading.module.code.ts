import { readFileSync, statSync } from "node:fs"
import { dirname, isAbsolute, join } from "node:path"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const HERE = "story/game/modules/row-reading"
const UTF8 = "utf8"
const BREAK = "\n"
const JSONL = "jsonl"
const FIRST_LINE = 1

export type Where = {
  readonly root: string
  readonly game: string
  readonly slug: string
  readonly path: string
  readonly folder: string
}

export type Found = { readonly answered: Where } | { readonly refused: string }

export type Read = { readonly answered: readonly unknown[] } | { readonly refused: string }

export function whereAt(root: string, game: string): Found {
  const named = addressIn(game)
  if (named.kind !== "qualified") return { refused: `\`${game}\` names no game, ${HERE}` }
  const listed = listedAt(root, named.pageTypeSlug, named.slug)[0]
  if (listed === undefined) return { refused: `\`${game}\` is no page here, ${HERE}` }
  return {
    answered: { root, game, slug: named.slug, path: listed.path, folder: dirname(listed.path) },
  }
}

export function fileAt(where: Where, propertySlug: string): string | null {
  return besideAt(where.path, propertySlug, JSONL)
}

export function rowsIn(body: string, beside: string): Read {
  const found: unknown[] = []
  for (const [at, line] of body.split(BREAK).entries()) {
    if (line.trim() === "") continue
    try {
      found.push(JSON.parse(line) as unknown)
    } catch {
      return { refused: `line ${at + FIRST_LINE} of ${beside} is no json, ${HERE}` }
    }
  }
  return { answered: found }
}

export function rowsOf(where: Where, propertySlug: string): Read {
  const beside = fileAt(where, propertySlug)
  if (beside === null) return { refused: `\`${where.path}\` names no page, ${HERE}` }
  const at = isAbsolute(beside) ? beside : join(where.root, beside)
  if (statSync(at, { throwIfNoEntry: false }) === undefined) return { answered: [] }
  return rowsIn(readFileSync(at, UTF8), beside)
}
