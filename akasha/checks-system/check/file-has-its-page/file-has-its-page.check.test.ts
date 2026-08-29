import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "../../../command-system/scratching.module.code.ts"
import type { Leaving } from "../../judging/judging.module.code.ts"
import {
  claimedByTheChange,
  fileHasItsPage,
  UNCLAIMED,
  unclaimedIn,
} from "./file-has-its-page.check.code.ts"

const INDEX = join(".git", "data", "index")

const ID = "01a04d86-434f-75ff-8000-000000000001"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function filed(root: string, at: string, line: string): void {
  const full = join(root, INDEX, at)
  mkdirSync(dirname(full), { recursive: true })
  writeFileSync(full, `${line}\n`, "utf8")
}

function rooted(fileProperties: readonly string[] = ["code", "test"]): string {
  const root = scratch.rootFor("akasha-claimed-")
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

function pageBody(slug: string, stated: string): Uint8Array {
  return new TextEncoder().encode(
    `export const it = { id: "${ID}", slug: "${slug}", pageTypeSlug: "module"${stated} }\n`
  )
}

function arriving(
  root: string,
  changed: readonly string[],
  bodies: Record<string, Uint8Array> = {}
): Leaving {
  const at = (path: string): Uint8Array => bodies[path] ?? new Uint8Array(0)
  return { root, changed, at, was: at }
}

test("a path the index says a page claims is let through", () => {
  const root = rooted()
  claiming(root, "akasha/a/held.module.ts", "akasha/a/held.module.ts")
  expect(fileHasItsPage(arriving(root, ["akasha/a/held.module.ts"]))).toEqual([])
})

test("a path no page claims is refused, and the refusal says why it matters", () => {
  const root = rooted()
  const said = fileHasItsPage(arriving(root, ["akasha/a/stray.ts"]))
  expect(said).toEqual([{ path: "akasha/a/stray.ts", reason: UNCLAIMED }])
  expect(UNCLAIMED).toContain("enumerated by nothing and audited by nothing")
})

test("a file beside a page that no page property names is refused", () => {
  const root = rooted()
  claiming(root, "akasha/a/held.module.ts", "akasha/a/held.module.ts")
  const said = fileHasItsPage(
    arriving(root, ["akasha/a/held.module.ts", "akasha/a/held.module.part-two.ts"], {
      "akasha/a/held.module.ts": pageBody("held", ""),
    })
  )
  expect(said.map((one) => one.path)).toEqual(["akasha/a/held.module.part-two.ts"])
})

test("a page arriving in the change claims its own path, though no index knows it yet", () => {
  const root = rooted()
  expect(
    fileHasItsPage(
      arriving(root, ["akasha/b/new.module.ts"], { "akasha/b/new.module.ts": pageBody("new", "") })
    )
  ).toEqual([])
})

test("a page arriving in the change claims the file its code property names", () => {
  const root = rooted()
  const bodies = { "akasha/b/new.module.ts": pageBody("new", ', code: "ts"') }
  expect(
    fileHasItsPage(
      arriving(root, ["akasha/b/new.module.ts", "akasha/b/new.module.code.ts"], bodies)
    )
  ).toEqual([])
})

test("which properties name a file is read from the index, not from a list in the check", () => {
  const root = rooted(["code", "notes"])
  const bodies = { "akasha/b/new.module.ts": pageBody("new", ', notes: "md"') }
  expect(claimedByTheChange(arriving(root, ["akasha/b/new.module.ts"], bodies))).toContain(
    "akasha/b/new.module.notes.md"
  )
  expect(
    fileHasItsPage(
      arriving(root, ["akasha/b/new.module.ts", "akasha/b/new.module.notes.md"], bodies)
    )
  ).toEqual([])
})

test("a property whose shape is not a file names no file, so a path built from it is unclaimed", () => {
  const root = rooted(["code"])
  const bodies = { "akasha/b/new.module.ts": pageBody("new", ', definition: "held"') }
  expect(
    fileHasItsPage(
      arriving(root, ["akasha/b/new.module.ts", "akasha/b/new.module.definition.held"], bodies)
    ).map((one) => one.path)
  ).toEqual(["akasha/b/new.module.definition.held"])
})

test("a path the change takes away is passed over", () => {
  const root = rooted()
  expect(
    fileHasItsPage({ root, changed: ["akasha/a/stray.ts"], at: () => null, was: () => null })
  ).toEqual([])
})

test("a path outside the akasha folder is passed over", () => {
  const root = rooted()
  expect(fileHasItsPage(arriving(root, ["dotfiles/bin/akasha", "README.md"]))).toEqual([])
})

test("a page whose page type the index does not know is not asked what it claims", () => {
  const root = rooted()
  const bodies = { "akasha/b/new.oddity.ts": pageBody("new", "") }
  expect(
    fileHasItsPage(arriving(root, ["akasha/b/new.oddity.ts"], bodies)).map((one) => one.path)
  ).toEqual(["akasha/b/new.oddity.ts"])
})

test("a change with nothing unclaimed asks for no page body", () => {
  const root = rooted()
  claiming(root, "akasha/a/held.module.ts", "akasha/a/held.module.ts")
  const asked: string[] = []
  const at = (path: string): Uint8Array => {
    asked.push(path)
    return pageBody("held", ', code: "ts"')
  }
  expect(fileHasItsPage({ root, changed: ["akasha/a/held.module.ts"], at, was: at })).toEqual([])
  expect(asked).toEqual(["akasha/a/held.module.ts"])
})

test("a change carrying something unclaimed does ask for the page bodies in it", () => {
  const root = rooted()
  const asked: string[] = []
  const at = (path: string): Uint8Array => {
    asked.push(path)
    return pageBody("held", ', code: "ts"')
  }
  expect(fileHasItsPage({ root, changed: ["akasha/a/held.module.ts"], at, was: at })).toEqual([])
  expect(asked).toEqual(["akasha/a/held.module.ts", "akasha/a/held.module.ts"])
})

test("a page body that will not load claims nothing beyond what the index already says", () => {
  const root = rooted()
  const broken = new TextEncoder().encode("export const it = (\n")
  const said = fileHasItsPage(
    arriving(root, ["akasha/a/held.module.ts"], { "akasha/a/held.module.ts": broken })
  )
  expect(said.map((one) => one.path)).toEqual(["akasha/a/held.module.ts"])
})

test("the unclaimed pass reads the index under the root it was given, and no other", () => {
  const named = rooted()
  claiming(named, "akasha/a/held.module.ts", "akasha/a/held.module.ts")
  const bare = rooted()
  expect(unclaimedIn(arriving(named, ["akasha/a/held.module.ts"]))).toEqual([])
  expect(unclaimedIn(arriving(bare, ["akasha/a/held.module.ts"]))).toEqual([
    "akasha/a/held.module.ts",
  ])
})
