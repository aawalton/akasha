import { expect, test } from "bun:test"
import {
  type Asking,
  reasonsIn,
  type Sides,
  sidesIn,
} from "./client-reaches-pages-through-its-hooks.code-check.decision.code.ts"

const SIDES: Sides = {
  access: { folder: "akasha/access", named: "@t/access" },
  hooks: { folder: "akasha/hooks", named: "@t/hooks" },
  own: ["akasha/hooks", "akasha/store"],
}

const AT = "akasha/app/panel.module.code.ts"

const OPENS = '"use client"\n'

function asking(
  folders: Readonly<Record<string, string>>,
  manifest: string | null,
  bodies: Readonly<Record<string, string>> = {}
): Asking {
  return {
    folderOf: (slug) => folders[slug] ?? null,
    manifestNamed: () => manifest,
    textAt: (path) => bodies[path] ?? null,
  }
}

const FOLDERS = {
  "pages-access": "pages/access",
  "pages-ui": "pages/ui",
  "pages-ui-store": "pages/ui-store",
}

test("a file carrying no directive is let through though it calls an access value", () => {
  const body = 'import { upsertPages } from "@t/access/upsert"\nupsertPages({})\n'
  expect(reasonsIn(AT, body, SIDES)).toEqual([])
})

test("a client file calling an access value is refused, and the reason names line and callee", () => {
  const body = `${OPENS}import { upsertPages } from "@t/access/upsert"\nupsertPages({})\n`
  const said = reasonsIn(AT, body, SIDES)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 3")
  expect(said[0]).toContain("`upsertPages`")
  expect(said[0]).toContain("@t/access")
  expect(said[0]).toContain("@t/hooks")
})

test("that call is let through where a call to a hooks value encloses it", () => {
  const body =
    `${OPENS}import { upsertPages } from "@t/access/upsert"\n` +
    'import { useOptimisticUpsertPages } from "@t/hooks/mutations"\n' +
    "const run = useOptimisticUpsertPages((args) => upsertPages(args))\n"
  expect(reasonsIn(AT, body, SIDES)).toEqual([])
})

test("a namespace import of the access package is reached through its name", () => {
  const body = `${OPENS}import * as access from "@t/access"\naccess.upsertPages({})\n`
  const said = reasonsIn(AT, body, SIDES)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`access.upsertPages`")
})

test("a type-only import reaches neither side", () => {
  const body = `${OPENS}import type { UpsertPages } from "@t/access/upsert"\nupsertPages({})\n`
  expect(reasonsIn(AT, body, SIDES)).toEqual([])
})

test("a name taken as a type inside a value import reaches neither side", () => {
  const body = `${OPENS}import { type upsertPages } from "@t/access/upsert"\nupsertPages({})\n`
  expect(reasonsIn(AT, body, SIDES)).toEqual([])
})

test("a relative path landing in the access folder reaches the access package", () => {
  const at = "akasha/access-near/panel.module.code.ts"
  const body = `${OPENS}import { upsertPages } from "../access/upsert"\nupsertPages({})\n`
  expect(reasonsIn(at, body, SIDES)).toHaveLength(1)
})

test("a side whose manifest calls it nothing is reached only by a path into its folder", () => {
  const sides: Sides = {
    access: { folder: "akasha/access", named: null },
    hooks: SIDES.hooks,
    own: SIDES.own,
  }
  const near = "akasha/access-near/panel.module.code.ts"
  const named = `${OPENS}import { upsertPages } from "@t/access/upsert"\nupsertPages({})\n`
  const pathed = `${OPENS}import { upsertPages } from "../access/upsert"\nupsertPages({})\n`
  expect(reasonsIn(near, named, sides)).toEqual([])
  expect(reasonsIn(near, pathed, sides)).toHaveLength(1)
})

test("a chain reading the pages table by name is refused", () => {
  const body = `${OPENS}const rows = await client.from("pages").select()\n`
  const said = reasonsIn(AT, body, SIDES)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`pages` table")
})

test("a chain reading another table is let through", () => {
  const body = `${OPENS}const rows = await client.from("seats").select()\n`
  expect(reasonsIn(AT, body, SIDES)).toEqual([])
})

test("a pages subscription is refused though a hooks call encloses it", () => {
  const body =
    `${OPENS}import { useLive } from "@t/hooks/live"\n` +
    'useLive(() => channel.on("postgres_changes", { event: "*", table: "pages" }, take))\n'
  const said = reasonsIn(AT, body, SIDES)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("postgres_changes")
})

test("a subscription on another table is let through", () => {
  const body = `${OPENS}channel.on("postgres_changes", { table: "seats" }, take)\n`
  expect(reasonsIn(AT, body, SIDES)).toEqual([])
})

test("a file inside the hooks package or the store beside it is not judged", () => {
  const body = `${OPENS}import { upsertPages } from "@t/access/upsert"\nupsertPages({})\n`
  expect(reasonsIn("akasha/hooks/write/write.module.code.ts", body, SIDES)).toEqual([])
  expect(reasonsIn("akasha/store/write/write.module.code.ts", body, SIDES)).toEqual([])
})

test("every site a client file holds is reported", () => {
  const body =
    `${OPENS}import { upsertPages, deletePages } from "@t/access/upsert"\n` +
    "upsertPages({})\ndeletePages({})\n"
  expect(reasonsIn(AT, body, SIDES)).toHaveLength(2)
})

test("the sides are read from the package pages and the manifests beside them", () => {
  const said = sidesIn(
    asking(FOLDERS, "package.json", {
      "pages/access/package.json": '{ "name": "@akasha/pages-access" }',
      "pages/ui/package.json": '{ "name": "@akasha/pages-ui" }',
      "pages/ui-store/package.json": '{ "name": "@akasha/pages-ui-store" }',
    })
  )
  expect(said?.access).toEqual({ folder: "pages/access", named: "@akasha/pages-access" })
  expect(said?.hooks).toEqual({ folder: "pages/ui", named: "@akasha/pages-ui" })
  expect(said?.own).toEqual(["pages/ui", "pages/ui-store"])
})

test("a manifest that is not there leaves a side named by nothing", () => {
  const said = sidesIn(asking(FOLDERS, "package.json"))
  expect(said?.access).toEqual({ folder: "pages/access", named: null })
})

test("an index naming no manifest file leaves every side named by nothing", () => {
  const said = sidesIn(asking(FOLDERS, null))
  expect(said?.hooks).toEqual({ folder: "pages/ui", named: null })
})

test("an index naming no access page or no hooks page answers nothing", () => {
  expect(sidesIn(asking({ "pages-ui": "pages/ui" }, "package.json"))).toBeNull()
  expect(sidesIn(asking({ "pages-access": "pages/access" }, "package.json"))).toBeNull()
})

test("an index naming no store page leaves the hooks package alone exempt", () => {
  const said = sidesIn(
    asking({ "pages-access": "pages/access", "pages-ui": "pages/ui" }, "package.json")
  )
  expect(said?.own).toEqual(["pages/ui"])
})
