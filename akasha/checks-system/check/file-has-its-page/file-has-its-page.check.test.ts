import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { shadowFor } from "../../../pages-system/shadow/shadow.module.code.ts"
import { claiming, declaring, stands } from "../../check-scratch/check-scratch.module.code.ts"
import type { Change, Judged } from "../../judging/judging.module.code.ts"
import { fileHasItsPage, UNCLAIMED, unclaimedIn } from "./file-has-its-page.check.code.ts"

const ID = "01a04d86-434f-75ff-8000-000000000001"

const KINDS = ["module", "check", "domain", "page-type", "file-property"]

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rooted(fileProperties: readonly string[] = ["code", "test"]): string {
  const root = scratch.rootFor("akasha-claimed-")
  for (const one of KINDS) {
    stands(root, "page-type", one, `${ID.slice(0, -1)}${one.length}`)
  }
  declaring(root, "id", { pageTypeSlug: "text-property", unique: "always" })
  for (const one of fileProperties)
    declaring(root, one, { pageTypeSlug: "file-property", unique: null })
  declaring(root, "definition", { pageTypeSlug: "text-property", unique: null })
  return root
}

function pageBody(slug: string, stated: string, pageTypeSlug = "module"): Uint8Array {
  return new TextEncoder().encode(
    `export const it = { id: "${ID}", slug: "${slug}", pageTypeSlug: "${pageTypeSlug}"${stated} }\n`
  )
}

function arriving(
  root: string,
  changed: readonly string[],
  bodies: Record<string, Uint8Array> = {}
): Change {
  return {
    root,
    changed,
    after: (path: string): Uint8Array => bodies[path] ?? new Uint8Array(0),
    before: (): null => null,
  }
}

function judged(change: Change): readonly Judged[] {
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  return fileHasItsPage(change, cast.shadow)
}

function unclaimed(change: Change): readonly string[] {
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  return unclaimedIn(change, cast.shadow)
}

test("a path the index says a page claims is let through", () => {
  const root = rooted()
  claiming(root, "akasha/a/held.module.ts", "akasha/a/held.module.ts", ID)
  expect(judged(arriving(root, ["akasha/a/held.module.ts"]))).toEqual([])
})

test("a path no page claims is refused, and the refusal says why it matters", () => {
  const root = rooted()
  const said = judged(arriving(root, ["akasha/a/stray.ts"]))
  expect(said).toEqual([{ path: "akasha/a/stray.ts", reason: UNCLAIMED }])
  expect(UNCLAIMED).toContain("enumerated by nothing and audited by nothing")
})

test("a file beside a page that no page property names is refused", () => {
  const root = rooted()
  claiming(root, "akasha/a/held.module.ts", "akasha/a/held.module.ts", ID)
  const said = judged(
    arriving(root, ["akasha/a/held.module.ts", "akasha/a/held.module.part-two.ts"], {
      "akasha/a/held.module.ts": pageBody("held", ""),
    })
  )
  expect(said.map((one) => one.path)).toEqual(["akasha/a/held.module.part-two.ts"])
})

test("a page arriving in the change claims its own path, though no index knows it yet", () => {
  const root = rooted()
  expect(
    judged(
      arriving(root, ["akasha/b/new.module.ts"], { "akasha/b/new.module.ts": pageBody("new", "") })
    )
  ).toEqual([])
})

test("a page arriving in the change claims the file its code property names", () => {
  const root = rooted()
  const bodies = { "akasha/b/new.module.ts": pageBody("new", ', code: "ts"') }
  expect(
    judged(arriving(root, ["akasha/b/new.module.ts", "akasha/b/new.module.code.ts"], bodies))
  ).toEqual([])
})

test("which properties name a file is read from the index, not from a list in the check", () => {
  const root = rooted(["code", "notes"])
  const bodies = { "akasha/b/new.module.ts": pageBody("new", ', notes: "md"') }
  expect(
    judged(arriving(root, ["akasha/b/new.module.ts", "akasha/b/new.module.notes.md"], bodies))
  ).toEqual([])
})

test("a file property the change itself introduces names its file", () => {
  const root = rooted(["code"])
  const bodies = {
    "akasha/x/notes.file-property.ts": pageBody("notes", "", "file-property"),
    "akasha/b/new.module.ts": pageBody("new", ', notes: "md"'),
  }
  expect(
    judged(
      arriving(
        root,
        [
          "akasha/x/notes.file-property.ts",
          "akasha/b/new.module.ts",
          "akasha/b/new.module.notes.md",
        ],
        bodies
      )
    )
  ).toEqual([])
})

test("a claim the change withdraws is no claim, and the file it named is refused", () => {
  const root = rooted()
  claiming(root, "akasha/a/held.module.ts", "akasha/a/held.module.ts", ID)
  claiming(root, "akasha/a/held.module.code.ts", "akasha/a/held.module.ts", ID)
  const kept = new TextEncoder().encode("held\n")
  const was: Record<string, Uint8Array> = {
    "akasha/a/held.module.ts": pageBody("held", ', code: "ts"'),
    "akasha/a/held.module.code.ts": kept,
  }
  const at: Record<string, Uint8Array> = {
    "akasha/a/held.module.ts": pageBody("held", ""),
    "akasha/a/held.module.code.ts": kept,
  }
  const said = judged({
    root,
    changed: ["akasha/a/held.module.ts", "akasha/a/held.module.code.ts"],
    after: (path) => at[path] ?? null,
    before: (path) => was[path] ?? null,
  })
  expect(said.map((one) => one.path)).toEqual(["akasha/a/held.module.code.ts"])
})

test("a property whose shape is not a file names no file, so a path built from it is unclaimed", () => {
  const root = rooted(["code"])
  const bodies = { "akasha/b/new.module.ts": pageBody("new", ', definition: "held"') }
  expect(
    judged(
      arriving(root, ["akasha/b/new.module.ts", "akasha/b/new.module.definition.held"], bodies)
    ).map((one) => one.path)
  ).toEqual(["akasha/b/new.module.definition.held"])
})

test("a path the change takes away is passed over", () => {
  const root = rooted()
  expect(
    judged({ root, changed: ["akasha/a/stray.ts"], after: () => null, before: () => null })
  ).toEqual([])
})

test("a path outside the akasha folder is passed over", () => {
  const root = rooted()
  expect(judged(arriving(root, ["dotfiles/bin/akasha", "README.md"]))).toEqual([])
})

test("a page named for a page type nothing knows still claims the path it stands at", () => {
  const root = rooted()
  const bodies = { "akasha/b/new.oddity.ts": pageBody("new", "") }
  expect(judged(arriving(root, ["akasha/b/new.oddity.ts"], bodies))).toEqual([])
})

test("a page body that will not load claims nothing beyond what the index already says", () => {
  const root = rooted()
  const broken = new TextEncoder().encode("export const it = (\n")
  const said = judged(
    arriving(root, ["akasha/a/held.module.ts"], { "akasha/a/held.module.ts": broken })
  )
  expect(said.map((one) => one.path)).toEqual(["akasha/a/held.module.ts"])
})

test("the unclaimed pass reads the index under the root it was given, and no other", () => {
  const named = rooted()
  claiming(named, "akasha/a/held.module.ts", "akasha/a/held.module.ts", ID)
  const bare = rooted()
  expect(unclaimed(arriving(named, ["akasha/a/held.module.ts"]))).toEqual([])
  expect(unclaimed(arriving(bare, ["akasha/a/held.module.ts"]))).toEqual([
    "akasha/a/held.module.ts",
  ])
})
