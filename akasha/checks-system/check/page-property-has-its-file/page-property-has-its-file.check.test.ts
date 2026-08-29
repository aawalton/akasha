import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "../../../command-system/scratching.module.code.ts"
import type { Leaving } from "../../judging/judging.module.code.ts"
import {
  pagePropertyHasItsFile,
  pagesTouchedBy,
  statedBy,
} from "./page-property-has-its-file.check.code.ts"

const INDEX = join(".git", "data", "index")

const ID = "01a04d86-434f-7119-8000-000000000001"

const PAGE = "akasha/a/held.module.ts"

const CODE = "akasha/a/held.module.code.ts"

const TEST = "akasha/a/held.module.test.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function filed(root: string, at: string, line: string): void {
  const full = join(root, INDEX, at)
  mkdirSync(dirname(full), { recursive: true })
  writeFileSync(full, `${line}\n`, "utf8")
}

function rooted(fileProperties: readonly string[] = ["code", "test"]): string {
  const root = scratch.rootFor("akasha-property-filed-")
  for (const one of ["module", "check", "domain", "page-type"]) {
    filed(
      root,
      join("identity", "page-type", "slug", `${one}.jsonl`),
      JSON.stringify({ path: "", id: "" })
    )
  }
  for (const one of fileProperties) {
    filed(
      root,
      join("schema", "page-property", "slug", `${one}.jsonl`),
      JSON.stringify({ pageTypeSlug: "file-property", targetPageTypeSlug: null })
    )
  }
  filed(
    root,
    join("schema", "page-property", "slug", "definition.jsonl"),
    JSON.stringify({ pageTypeSlug: "text-property", targetPageTypeSlug: null })
  )
  return root
}

function claiming(root: string, path: string, page: string): void {
  filed(root, join("path", `${path}.jsonl`), JSON.stringify({ path: page, id: ID }))
}

function landed(root: string): void {
  for (const one of [PAGE, CODE]) claiming(root, one, PAGE)
}

function body(stated: string, slug: string = "held"): Uint8Array {
  return new TextEncoder().encode(
    `export const it = { id: "${ID}", slug: "${slug}", pageTypeSlug: "module"${stated} }\n`
  )
}

function over(
  root: string,
  changed: readonly string[],
  bodies: Record<string, Uint8Array | null>
): Leaving {
  const at = (path: string): Uint8Array | null =>
    path in bodies ? (bodies[path] ?? null) : new Uint8Array(0)
  return {
    root,
    changed,
    at,
    was: at,
  }
}

test("a page whose stated code file stands in the change is let through", () => {
  const root = rooted()
  expect(
    pagePropertyHasItsFile(over(root, [PAGE, CODE], { [PAGE]: body(', code: "ts"') }))
  ).toEqual([])
})

test("a page stating a code file that stands nowhere is refused, and the refusal names both", () => {
  const root = rooted()
  const said = pagePropertyHasItsFile(
    over(root, [PAGE], { [PAGE]: body(', code: "ts"'), [CODE]: null })
  )
  expect(said).toEqual([
    { path: PAGE, reason: `states \`code: "ts"\`, and no file stands at ${CODE}` },
  ])
})

test("a change taking away a code file refuses the page that still states it, though the change never names that page", () => {
  const root = rooted()
  landed(root)
  const said = pagePropertyHasItsFile(
    over(root, [CODE], { [PAGE]: body(', code: "ts"'), [CODE]: null })
  )
  expect(said).toEqual([
    { path: PAGE, reason: `states \`code: "ts"\`, and no file stands at ${CODE}` },
  ])
})

test("a change taking away the page and its code file together is silent", () => {
  const root = rooted()
  expect(pagePropertyHasItsFile(over(root, [PAGE, CODE], { [PAGE]: null, [CODE]: null }))).toEqual(
    []
  )
})

test("an empty file is a file, and presence is the whole test", () => {
  const root = rooted()
  expect(
    pagePropertyHasItsFile(
      over(root, [PAGE, CODE], { [PAGE]: body(', code: "ts"'), [CODE]: new Uint8Array(0) })
    )
  ).toEqual([])
})

test("every file property a page states is judged, not only the first", () => {
  const root = rooted()
  const said = pagePropertyHasItsFile(
    over(root, [PAGE], { [PAGE]: body(', code: "ts", test: "ts"'), [CODE]: null, [TEST]: null })
  )
  expect(said.map((one) => one.reason)).toEqual([
    `states \`code: "ts"\`, and no file stands at ${CODE}`,
    `states \`test: "ts"\`, and no file stands at ${TEST}`,
  ])
})

test("which properties are held in a file is read from the index, not from a list in the check", () => {
  const root = rooted(["code", "notes"])
  const said = pagePropertyHasItsFile(
    over(root, [PAGE], { [PAGE]: body(', notes: "md"'), "akasha/a/held.module.notes.md": null })
  )
  expect(said.map((one) => one.reason)).toEqual([
    'states `notes: "md"`, and no file stands at akasha/a/held.module.notes.md',
  ])
})

test("a property whose shape is not a file is not asked for a file", () => {
  const root = rooted(["code"])
  expect(
    pagePropertyHasItsFile(over(root, [PAGE], { [PAGE]: body(', code: "ts", definition: "held"') }))
  ).toEqual([])
})

test("an index entry pointing at a page the change takes away raises nothing", () => {
  const root = rooted()
  landed(root)
  expect(pagePropertyHasItsFile(over(root, [CODE], { [PAGE]: null, [CODE]: null }))).toEqual([])
})

test("an index entry pointing at a page whose body will not load raises nothing", () => {
  const root = rooted()
  landed(root)
  const broken = new TextEncoder().encode("export const it = (\n")
  expect(pagePropertyHasItsFile(over(root, [CODE], { [PAGE]: broken, [CODE]: null }))).toEqual([])
})

test("a path outside the akasha folder is passed over", () => {
  const root = rooted()
  expect(pagePropertyHasItsFile(over(root, ["dotfiles/bin/akasha"], {}))).toEqual([])
})

test("a page is judged once, whether the change names the page, the file, or both", () => {
  const root = rooted()
  landed(root)
  const bodies = { [PAGE]: body(', code: "ts"'), [CODE]: null }
  for (const changed of [[PAGE], [CODE], [PAGE, CODE]]) {
    expect(pagePropertyHasItsFile(over(root, changed, bodies))).toHaveLength(1)
  }
})

test("the pages to judge are the pages in the change and the pages the index says carry its paths", () => {
  const root = rooted()
  landed(root)
  const pageTypes = new Set(["module"])
  expect(pagesTouchedBy(over(root, [CODE], {}), pageTypes)).toEqual([PAGE])
  expect(pagesTouchedBy(over(root, ["akasha/b/new.module.ts"], {}), pageTypes)).toEqual([
    "akasha/b/new.module.ts",
  ])
  expect(pagesTouchedBy(over(root, ["akasha/a/loose.txt"], {}), pageTypes)).toEqual([])
})

test("the label on a refusal is the property and the value the page states", () => {
  expect(statedBy(PAGE, CODE)).toBe('`code: "ts"`')
  expect(statedBy("akasha/a/b.check.ts", "akasha/a/b.check.test.ts")).toBe('`test: "ts"`')
  expect(statedBy("akasha/a/b.module.ts", "akasha/a/b.module.notes.md")).toBe('`notes: "md"`')
})

test("the check reads the index under the root it was given, and no other", () => {
  const named = rooted()
  landed(named)
  const bare = rooted()
  const bodies = { [PAGE]: body(', code: "ts"'), [CODE]: null }
  expect(pagePropertyHasItsFile(over(named, [CODE], bodies))).toHaveLength(1)
  expect(pagePropertyHasItsFile(over(bare, [CODE], bodies))).toEqual([])
})
