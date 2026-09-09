import { mkdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { importIn } from "@akasha/indexes/import"
import { indexImport } from "@akasha/indexes/import/page"
import {
  entriesFiled,
  listedFiled,
  noImportersFiled,
  pathFiled,
  schemaFiled,
} from "@akasha/indexes/testing"
import type { Change } from "@akasha/pages/change"
import { put, there } from "@akasha/testing-system/putting"
import { importEdge } from "akasha/graph/edges/pages/import-edge.graph-edge.ts"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"

const EDGE_PAGE_AT = "graph/import-edge.graph-edge.ts"

const INDEX_PAGE_AT = "graph/index-import.index.ts"

const GENERATED_ID = "01a04f2b-3d24-70b3-8c3e-3076a9299145"

const THING_TYPE_AT = "akasha/thing.page-type.ts"

const HELD_AT = "akasha/held.text-property.ts"

const WAITS = "waiting"

export const EARLY = "uuid-v7"

export const HERE = "/var/home/walton/repos/akasha"

const KIND_AT = "akasha/waiting.generator-kind.ts"

const EARLY_AT = "akasha/uuid-v7.generator-kind.ts"

const THING_TYPE =
  "export type Thing = { held: string; slug: string }\n" +
  `export const thing = { id: "${GENERATED_ID}", pageTypeSlug: "page-type", slug: "thing" }\n`

export const THING_AT = "akasha/one.thing.ts"

const READS_ITS_TYPE = 'import type { Thing } from "./thing.page-type.ts"\n\n'

export const WHOLE = `${READS_ITS_TYPE}export const one = { held: "h", slug: "one" } as const satisfies Thing\n`

export const WITHOUT = `${READS_ITS_TYPE}export const one = { slug: "one" } as const satisfies Thing\n`

export const WRONG = `${READS_ITS_TYPE}export const one = { slug: 1 } as const satisfies Thing\n`

export const MADE: Readonly<Record<string, string>> = {
  "akasha/made/reader.ts": 'import { held } from "./held.ts"\n\nexport const reader = held\n',
  "akasha/made/held.ts": "export const held = 1\n",
}

export const ONE_NUMBER = "export const one: number = 1\n"

export const TWO_BREAKS = `${ONE_NUMBER}export const two: string = one\n`

export function exporting(): string {
  return staged({
    "akasha/held.ts": "export const one = 1\nexport const two = 2\n",
    "akasha/calls.ts": 'import { two } from "./held.ts"\nexport const said = two\n',
  })
}

export function across(): string {
  return staged({
    "akasha/one.ts": "export const one = 1\n",
    "shared/two.ts": 'import { one } from "../akasha/one.ts"\nexport const two = one\n',
  })
}

export function pairing(): string {
  return staged({
    "akasha/one.ts": "export const one = 1\n",
    "akasha/two.ts": 'import { one } from "./one.ts"\nexport const two: string = one\n',
  })
}

export function basing(): string {
  return staged({
    "akasha/a.ts": ONE_NUMBER,
    "akasha/b.ts": 'import { one } from "./a.ts"\nexport const two: string = one\n',
  })
}

export const TAKES_NUMBER = "export function held(one: number): number {\n  return one\n}\n"

export const CALLS_HELD = 'import { held } from "./held.ts"\nexport const one = held(1)\n'

export const IMPORTS_TYPEGEN =
  'import type { Route } from "./+types/two"\n\nexport const two: Route = 1\n'

const PAGE_TYPE = "page-type"

const TEXT_PROPERTY = "text-property"

const GENERATOR_KIND = "generator-kind"

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
  noImportersFiled(root)
  for (const [at, body] of Object.entries(files)) {
    entriesFiled(root, importIn(body, at, root))
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
  listedFiled(root, pageTypeSlug, slug, [{ path: at, id }])
}

function graphed(root: string): undefined {
  paged(root, EDGE_PAGE_AT, importEdge)
  paged(root, INDEX_PAGE_AT, indexImport)
  named(root, EDGE_PAGE_AT, importEdge.pageTypeSlug, importEdge.slug, importEdge.id)
  named(root, INDEX_PAGE_AT, indexImport.pageTypeSlug, indexImport.slug, indexImport.id)
  pathFiled(root, EDGE_PAGE_AT, [{ path: EDGE_PAGE_AT, id: importEdge.id }])
  pathFiled(root, INDEX_PAGE_AT, [{ path: INDEX_PAGE_AT, id: indexImport.id }])
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
  named(root, KIND_AT, GENERATOR_KIND, WAITS, GENERATED_ID)
  named(root, EARLY_AT, GENERATOR_KIND, EARLY, GENERATED_ID)
  schemaFiled(root, TEXT_PROPERTY, "slug", [
    {
      pageTypeSlug: TEXT_PROPERTY,
      targetPageTypeSlug: null,
      unique: PAGE_TYPE,
      slug: "slug",
      propertySlug: "slug",
    },
  ])
  schemaFiled(root, TEXT_PROPERTY, "held", [
    {
      pageTypeSlug: TEXT_PROPERTY,
      targetPageTypeSlug: null,
      unique: null,
      slug: "held",
      propertySlug: "held",
    },
  ])
  named(root, HELD_AT, TEXT_PROPERTY, "held", GENERATED_ID)
  named(root, THING_TYPE_AT, PAGE_TYPE, "thing", GENERATED_ID)
  return root
}

export function declaring(): string {
  const root = staged({
    [HELD_TYPE_AT]: bodied({
      id: TYPE_ID,
      pageTypeSlug: PAGE_TYPE,
      slug: HELD_TYPE,
      loadedBy: `${MODULE}/${HELD_LOADER}`,
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
  pathFiled(root, LOADED_AT, [{ path: LOADED_AT, id: LOADED_ID }])
  return root
}

export const DECLARED_AT = "akasha/eso-held.type-declaration.d.ts"

const DECLARED_ID = "01a04f2b-3d24-70b3-8c3e-3076a9299149"

export function declared(files: Readonly<Record<string, string>>): string {
  const root = staged({ [DECLARED_AT]: "declare const HELD_ONE: number\n", ...files })
  pathFiled(root, DECLARED_AT, [{ path: DECLARED_AT, id: DECLARED_ID }])
  return root
}

export function change(
  root: string,
  over: Readonly<Record<string, string | null>>,
  base: Readonly<Record<string, string>> = {}
): Change {
  const held = new Map(Object.entries(over))
  const bodies = new Map(Object.entries(base))
  const based = (path: string): Uint8Array | null => {
    const found = bodies.get(path)
    if (found !== undefined) return new TextEncoder().encode(found)
    return there(root, path) ? readFileSync(join(root, path)) : null
  }
  return {
    root,
    changed: [...held.keys()].sort(),
    after: (path) => {
      if (held.has(path)) {
        const said = held.get(path)
        return said === undefined || said === null ? null : new TextEncoder().encode(said)
      }
      return based(path)
    },
    before: based,
  }
}

export const FIRST_OF =
  "export function first(held: readonly string[]): string {\n  return held[0]\n}\n"

export const CHAINED =
  "type A = { a: number }\ntype B = { a: number; b: number }\nexport const one: B = { a: 1 } as A\n"

export function holding(): string {
  return staged({ "akasha/one.ts": "export const one = 1\n" })
}

export function calling(): string {
  return staged({ "akasha/held.ts": TAKES_NUMBER, "akasha/calls.ts": CALLS_HELD })
}

export function reading(): string {
  return staged({
    "akasha/broken.ts":
      'import { a } from "./a.ts"\nimport { b } from "./b.ts"\nimport { c } from "./c.ts"\nexport const one: string = a + b + c\n',
    "akasha/a.ts": "export const a = 1\n",
    "akasha/b.ts": "export const b = 2\n",
    "akasha/c.ts": "export const c = 3\n",
  })
}

export function deep(): string {
  return staged({
    "akasha/one.ts": "export const one = 1\n",
    "akasha/deep/two.ts": 'import { one } from "../one.ts"\nexport const two = one\n',
    "akasha/deep/three.ts": 'import { two } from "./two.ts"\nexport const three = two\n',
    "akasha/apart.ts": "export const apart = 1\n",
  })
}

export function numbered(): string {
  return staged({ "akasha/one.ts": ONE_NUMBER })
}

export function breaking(): string {
  return staged({ "akasha/one.ts": TWO_BREAKS })
}

export function noting(): string {
  return staged({ "akasha/notes.txt": "nothing to compile\n" })
}

export function unreached(): string {
  return staged({
    "akasha/broken.ts": "export const one: string = 1\n",
    "akasha/apart.ts": "export const apart = 1\n",
  })
}

export function twinned(): string {
  return staged({
    "akasha/one.ts": "export const one = 1\n",
    "akasha/two.ts": "export const two = 2\n",
  })
}

export const READER_AT = "akasha/reader.ts"

const PACKAGE_AT = "akasha/persons/package.json"

const PACKAGE_CODE_AT = "akasha/persons/persons.module.code.ts"

const PACKAGE_FOLDER = "akasha/persons"

const PACKAGES_AT = "node_modules/@akasha"

const MOVED_AT = "akasha/people/package.json"

const MOVED_CODE_AT = "akasha/people/persons.module.code.ts"

const PERSONS = "export const persons = 1\n"

const PACKAGE_MANIFEST =
  '{ "name": "@akasha/persons", "exports": { ".": "./persons.module.code.ts" } }\n'

function readsFrom(specifier: string): string {
  return `import { persons } from "${specifier}"\n\nexport const said = persons\n`
}

export function packaging(specifier: string): Readonly<Record<string, string>> {
  return {
    [PACKAGE_AT]: PACKAGE_MANIFEST,
    [PACKAGE_CODE_AT]: PERSONS,
    [READER_AT]: readsFrom(specifier),
  }
}

export function moving(): Change {
  const root = staged(packaging("@akasha/persons"))
  mkdirSync(join(root, PACKAGES_AT), { recursive: true })
  symlinkSync(join(root, PACKAGE_FOLDER), join(root, PACKAGES_AT, "persons"))
  return change(root, {
    [PACKAGE_AT]: null,
    [PACKAGE_CODE_AT]: null,
    [MOVED_AT]: PACKAGE_MANIFEST,
    [MOVED_CODE_AT]: PERSONS,
    [READER_AT]: readsFrom("@akasha/persons"),
  })
}
