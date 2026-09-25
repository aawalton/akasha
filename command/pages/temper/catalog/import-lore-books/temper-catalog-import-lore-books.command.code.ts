import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { formattedBodies } from "akasha/code/running/modules/code-format/code-format.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { loreCategory as loreCategoryArgument } from "akasha/command/argument/pages/lore-category.argument.ts"
import {
  answering,
  DATA,
  INPUT,
  keeping,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { identifiedOver } from "akasha/command/modules/value-minting/value-minting.change-generator.code.ts"
import {
  type Existing,
  type Plan,
  type PlannedCollection,
  planned,
} from "akasha/command/pages/temper/catalog/import-lore-books/modules/lore-book-planning/lore-book-planning.module.code.ts"
import { temperCatalogImportLoreBooks as page } from "akasha/command/pages/temper/catalog/import-lore-books/temper-catalog-import-lore-books.command.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { strippedOf } from "akasha/page/naming/modules/folder-named/folder-named.module.code.ts"
import {
  composedFor,
  foldedFor,
  type Naming,
  type Put,
  sourceFor,
} from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import { putting } from "akasha/page/service/modules/page-putting/page-putting.module.code.ts"
import { BOOK_DATA } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-book-data/lorebooks-book-data.module.code.ts"
import { LIBRARY_DATA } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-library-data/lorebooks-library-data.module.code.ts"
import { SHALIDOR_LOCATIONS } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-shalidor-locations/lorebooks-shalidor-locations.module.code.ts"
import { LORE_LIBRARY_DATA } from "akasha/temper/player/completion/modules/lore-library-data/lore-library-data.module.code.ts"

const NAMED = [loreCategoryArgument] as const

const COLLECTION = "temper-lore-collection"

const BOOK = "temper-lore-book"

const BOOKS = "books"

const CATEGORIES = new Set([1, 2, 3])

const EIDETIC = 3

const UTF8 = "utf8"

const JSONL = ".jsonl"

type Taken = { readonly category: number | null } | { readonly refused: string }

export function taken(argv: readonly string[], calledAs: string): Taken {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return { refused: read.refused.join(" ") }
  const said = read.taken.loreCategory
  if (said === undefined) return { category: null }
  const category = Number(said)
  if (!CATEGORIES.has(category)) {
    return {
      refused: `\`${loreCategoryArgument.said}\` takes 1, 2 or 3, and was handed \`${said}\``,
    }
  }
  return { category }
}

export function messageFor(collection: PlannedCollection): string {
  const name = collection.name === "" ? collection.slug : collection.name
  return `make a page of each lore book of ${name}`
}

function existingIn(root: string): Existing {
  const held = new Map<string, string>()
  for (const one of valuesOfType(root, COLLECTION)) {
    const { esoLoreCategoryId, esoCollectionIndex, slug } = one.value
    if (typeof slug !== "string" || esoCollectionIndex === undefined) continue
    held.set(`${String(esoLoreCategoryId)}:${String(esoCollectionIndex)}`, slug)
  }
  return (category, index) => held.get(`${category}:${index}`) ?? null
}

function heldAt(root: string, path: string): string | null {
  try {
    return readFileSync(join(root, path), UTF8)
  } catch {
    return null
  }
}

const MINTED = /^\{"id":"[0-9a-f-]+",?/gm

export function withoutIds(text: string): string {
  return text.replace(MINTED, "{")
}

export function rewritten(held: string | null, one: Put): boolean {
  if (held === null) return true
  if (!one.path.endsWith(JSONL)) return held !== one.content
  return withoutIds(held) !== withoutIds(one.content) || identifiedOver(held) !== null
}

const ENCODER = new TextEncoder()

const DECODER = new TextDecoder()

function changedIn(root: string, puts: readonly Put[]): readonly Put[] {
  const formatted = formattedBodies(
    root,
    new Map(puts.map((one) => [one.path, ENCODER.encode(one.content)] as const))
  )
  return puts.filter((one) => {
    const landed = formatted.get(one.path)
    const content = landed === undefined ? one.content : DECODER.decode(landed.body)
    return rewritten(heldAt(root, one.path), { path: one.path, content })
  })
}

export function bookFolder(collection: string, book: string): string {
  return strippedOf(book, [collection]) ?? book
}

type Composed = { readonly puts: readonly Put[] } | { readonly refused: string }

function composedOf(root: string, collection: PlannedCollection, existing: Existing): Composed {
  const had = collection.index !== null && existing(collection.category, collection.index) !== null
  const naming: Naming = {
    pageTypeSlug: COLLECTION,
    slug: collection.slug,
    values: collection.values,
    merge: had,
  }
  const made = composedFor(root, naming, sourceFor(root))
  if ("refused" in made) return { refused: made.refused }
  const folder = dirname(made.put.path)
  const books: Naming[] = collection.books.map((one) => ({
    pageTypeSlug: BOOK,
    slug: one.slug,
    values: one.values,
    path: `${folder}/${BOOKS}/${bookFolder(collection.slug, one.slug)}/${one.slug}.${BOOK}.ts`,
  }))
  const folded = foldedFor(root, [naming, ...books])
  if ("refused" in folded) return { refused: folded.refused }
  return { puts: folded.puts }
}

function unfiledOf(root: string, plan: Plan): Composed {
  const folded = foldedFor(
    root,
    plan.unfiled.map((one) => ({ pageTypeSlug: BOOK, slug: one.slug, values: one.values }))
  )
  if ("refused" in folded) return { refused: folded.refused }
  return { puts: folded.puts }
}

async function imported(done: string[], argv: readonly string[], given: Given, landing: Landing) {
  const held = taken(argv, given.calledAs)
  if ("refused" in held) return refused(held.refused, INPUT)
  const existing = existingIn(given.root)
  const plan = planned(
    {
      table: BOOK_DATA,
      library: LIBRARY_DATA,
      shalidor: SHALIDOR_LOCATIONS,
      captured: LORE_LIBRARY_DATA,
    },
    existing
  )
  const said: string[] = []
  const asked = plan.collections.filter(
    (one) => held.category === null || one.category === held.category
  )
  const runs: { readonly message: string; readonly compose: () => Composed }[] = asked.map(
    (one) => ({ message: messageFor(one), compose: () => composedOf(given.root, one, existing) })
  )
  if (held.category === null || held.category === EIDETIC) {
    runs.push({
      message: "make a page of each lore book the LoreBooks table files under no collection",
      compose: () => unfiledOf(given.root, plan),
    })
  }
  for (const run of runs) {
    const composed = run.compose()
    if ("refused" in composed) return keeping(done, refused(composed.refused, DATA))
    const changed = changedIn(given.root, composed.puts)
    if (changed.length === 0) {
      said.push(`${run.message}: already landed`)
      continue
    }
    const landed = await landing(given.root, changed.map(putting), run.message, {
      agentId: given.agentId,
      writer: given.writer,
      done,
    })
    if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
    said.push(`${run.message}: ${String(changed.length)} file(s)`)
  }
  return told(said)
}

export async function temperCatalogImportLoreBooks(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  return await answering(async (done) => await imported(done, argv, given, landing))
}
