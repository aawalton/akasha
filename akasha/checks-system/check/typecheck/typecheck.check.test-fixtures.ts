import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { importEdge } from "../../../graph-system/graph-edge/graph-edges/import-edge.graph-edge.ts"
import { importIn } from "../../../pages-system/indexes/index/index-import/index-import.index.code.ts"
import { indexImport } from "../../../pages-system/indexes/index/index-import/index-import.index.ts"
import { indexIn } from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import {
  headOf,
  stampKept,
} from "../../../pages-system/indexes/index-stamp/index-stamp.module.code.ts"
import { gitIn } from "../../../testing-system/gitting/gitting.module.code.ts"
import { put } from "../../../testing-system/putting/putting.module.code.ts"
import type { Judged, Leaving } from "../../judging/judging.module.code.ts"
import { typecheck } from "./typecheck.check.code.ts"

export const IMPORTS_AT = ".git/data/index/import/path"

const IDENTITY = "identity"

const SLUG = "slug"

const ENDING = ".jsonl"

const EDGE_PAGE_AT = "graph/import-edge.graph-edge.ts"

const INDEX_PAGE_AT = "graph/index-import.index.ts"

const GENERATED_ID = "01a04f2b-3d24-70b3-8c3e-3076a9299145"

const THING_TYPE_AT = "akasha/thing.page-type.ts"

const HELD_AT = "akasha/held.text-property.ts"

const WAITS = "next-seq"

export const EARLY = "uuid-v7"

const KIND_AT = "akasha/next-seq.generator-kind.ts"

const EARLY_AT = "akasha/uuid-v7.generator-kind.ts"

const THING_TYPE =
  "export type Thing = { held: string; slug: string }\n" +
  `export const thing = { id: "${GENERATED_ID}", pageTypeSlug: "page-type", slug: "thing" }\n`

const PAGE_TYPE = "page-type"

const MODULE = "module"

const HELD_TYPE = "held-type"

const HELD_LOADER = "held-loader"

const TYPE_ID = "01a04f2b-3d24-70b3-8c3e-3076a9299146"

const LOADER_ID = "01a04f2b-3d24-70b3-8c3e-3076a9299147"

const LOADED_ID = "01a04f2b-3d24-70b3-8c3e-3076a9299148"

const HELD_TYPE_AT = "akasha/held-type.page-type.ts"

const HELD_LOADER_AT = "akasha/held-loader.module.ts"

export const LOADER_CODE_AT = "akasha/held-loader.module.code.ts"

export const LOADED_AT = "akasha/loaded.held-type.ts"

const LOADER_BREAKS = "export const one: string = 1\n"

export const scratch = scratchWorld()

function reaching(root: string, files: Readonly<Record<string, string>>): undefined {
  mkdirSync(join(root, IMPORTS_AT), { recursive: true })
  for (const [at, body] of Object.entries(files)) {
    for (const one of importIn(body, at, root)) {
      const held = join(root, ".git/data/index", one.at)
      mkdirSync(dirname(held), { recursive: true })
      appendFileSync(held, `${one.line}\n`)
    }
  }
}

function bodied(held: unknown): string {
  return `export const held = ${JSON.stringify(held, null, 2)}\n`
}

function paged(root: string, at: string, held: unknown): undefined {
  put(root, at, bodied(held))
}

function named(
  root: string,
  at: string,
  pageTypeSlug: string,
  slug: string,
  id: string
): undefined {
  put(
    indexIn(root),
    join(IDENTITY, pageTypeSlug, SLUG, `${slug}${ENDING}`),
    `${JSON.stringify({ path: at, id })}\n`
  )
}

function graphed(root: string): undefined {
  paged(root, EDGE_PAGE_AT, importEdge)
  paged(root, INDEX_PAGE_AT, indexImport)
  named(root, EDGE_PAGE_AT, importEdge.pageTypeSlug, importEdge.slug, importEdge.id)
  named(root, INDEX_PAGE_AT, indexImport.pageTypeSlug, indexImport.slug, indexImport.id)
}

function stamped(root: string): undefined {
  gitIn(root, ["init", "--quiet"])
  gitIn(root, ["config", "user.email", "held@akasha"])
  gitIn(root, ["config", "user.name", "held"])
  writeFileSync(join(root, "seed"), "held\n")
  gitIn(root, ["add", "--", "seed"])
  gitIn(root, ["commit", "--quiet", "-m", "held", "--", "seed"])
  stampKept(join(root, ".git/data/index"), {
    commit: headOf(root) ?? "",
    tree: "akasha",
    settled: [],
  })
}

export function staged(files: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-typecheck-")
  mkdirSync(join(root, "akasha"))
  for (const [at, body] of Object.entries(files)) {
    mkdirSync(dirname(join(root, at)), { recursive: true })
    writeFileSync(join(root, at), body)
  }
  reaching(root, files)
  graphed(root)
  stamped(root)
  return root
}

function kindPage(slug: string, afterChecks: boolean): string {
  return (
    `export const kind = { id: "${GENERATED_ID}", pageTypeSlug: "generator-kind",` +
    ` slug: "${slug}", afterChecks: ${afterChecks} }\n`
  )
}

function heldPage(generator: string): string {
  return (
    `export const held = { id: "${GENERATED_ID}", pageTypeSlug: "text-property",` +
    ` slug: "held", generator: "${generator}" }\n`
  )
}

export function generating(files: Readonly<Record<string, string>>, generator = WAITS): string {
  const root = staged({
    [THING_TYPE_AT]: THING_TYPE,
    [HELD_AT]: heldPage(generator),
    [KIND_AT]: kindPage(WAITS, true),
    [EARLY_AT]: kindPage(EARLY, false),
    ...files,
  })
  const index = indexIn(root)
  put(
    index,
    `identity/generator-kind/slug/${WAITS}.jsonl`,
    `{"path":"${KIND_AT}","id":"${GENERATED_ID}"}\n`
  )
  put(
    index,
    `identity/generator-kind/slug/${EARLY}.jsonl`,
    `{"path":"${EARLY_AT}","id":"${GENERATED_ID}"}\n`
  )
  put(
    index,
    "schema/page-property/slug/slug.jsonl",
    '{"pageTypeSlug":"text-property","targetPageTypeSlug":null,"unique":"page-type"}\n'
  )
  put(
    index,
    "schema/page-property/slug/held.jsonl",
    '{"pageTypeSlug":"text-property","targetPageTypeSlug":null,"unique":null}\n'
  )
  put(
    index,
    "identity/text-property/slug/held.jsonl",
    `{"path":"${HELD_AT}","id":"${GENERATED_ID}"}\n`
  )
  put(
    index,
    "identity/page-type/slug/thing.jsonl",
    `{"path":"${THING_TYPE_AT}","id":"${GENERATED_ID}"}\n`
  )
  return root
}

export function declaring(): string {
  const root = staged({
    [HELD_TYPE_AT]: bodied({
      id: TYPE_ID,
      pageTypeSlug: PAGE_TYPE,
      slug: HELD_TYPE,
      loadedBySlug: `${MODULE}/${HELD_LOADER}`,
    }),
    [HELD_LOADER_AT]: bodied({
      id: LOADER_ID,
      pageTypeSlug: MODULE,
      slug: HELD_LOADER,
      code: "ts",
    }),
    [LOADER_CODE_AT]: LOADER_BREAKS,
    [LOADED_AT]: bodied({ id: LOADED_ID, pageTypeSlug: HELD_TYPE, slug: "loaded" }),
  })
  named(root, HELD_TYPE_AT, PAGE_TYPE, HELD_TYPE, TYPE_ID)
  named(root, HELD_LOADER_AT, MODULE, HELD_LOADER, LOADER_ID)
  put(
    indexIn(root),
    join("path", `${LOADED_AT}${ENDING}`),
    `${JSON.stringify({ path: LOADED_AT, id: LOADED_ID })}\n`
  )
  return root
}

export function leaving(
  root: string,
  over: Readonly<Record<string, string | null>>,
  base: Readonly<Record<string, string>> = {}
): Leaving {
  const held = new Map(Object.entries(over))
  const standing = new Map(Object.entries(base))
  const based = (path: string): Uint8Array | null => {
    const found = standing.get(path)
    if (found !== undefined) return new TextEncoder().encode(found)
    try {
      return readFileSync(join(root, path))
    } catch {
      return null
    }
  }
  return {
    root,
    changed: [...held.keys()].sort(),
    at: (path) => {
      if (held.has(path)) {
        const said = held.get(path)
        return said === undefined || said === null ? null : new TextEncoder().encode(said)
      }
      return based(path)
    },
    was: based,
  }
}

export function over(root: string, path: string, body: string | null): readonly Judged[] {
  return typecheck(leaving(root, { [path]: body }))
}
