import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import type { Change } from "../../../pages-system/change/change.module.code.ts"
import { standingFiled } from "../../../pages-system/indexes/index-reading/index-reading.module.test-fixtures.ts"
import { shadowFor } from "../../../pages-system/shadow/shadow.module.code.ts"
import { declaring, landing, NO_BYTES } from "../../check-scratch/check-scratch.module.code.ts"
import type { Judged } from "../../judging/judging.module.code.ts"
import {
  declaresIn,
  introducedPropertyIsAPart,
  partedIn,
  typeNamedIn,
} from "./introduced-property-is-a-part.check.code.ts"

const TEXT = "text-property"

const PAGE_TYPE = "page-type"

const QUALIFIED = `${TEXT}/foo`

const REACHED: readonly string[] = ["mine", "shared", "its", "foo"]

const scratch = scratchWorld()

afterAll(scratch.sweep)

function pathFor(slug: string): string {
  return `akasha/${slug}.page-type.ts`
}

function stated(
  slug: string,
  above: string | null,
  declares: readonly string[],
  parts: readonly string[]
): string {
  const said = above === null ? "" : `, extendsSlug: ${JSON.stringify(`page-type/${above}`)}`
  const held_ = declares.map((one) => ({ pagePropertySlug: one }))
  return (
    `export const held = { id: ${JSON.stringify(`id-${slug}`)}, pageTypeSlug: "page-type", ` +
    `slug: ${JSON.stringify(slug)}${said}, properties: ${JSON.stringify(held_)}, ` +
    `partSlugs: ${JSON.stringify(parts)} }\n`
  )
}

function standing(
  root: string,
  slug: string,
  above: string | null,
  declares: readonly string[],
  parts: readonly string[]
): undefined {
  const path = pathFor(slug)
  standingFiled(root, PAGE_TYPE, slug, [{ path, id: `id-${slug}` }])
  mkdirSync(join(root, "akasha"), { recursive: true })
  writeFileSync(join(root, path), stated(slug, above, declares, parts))
}

function rooted(): string {
  const root = scratch.rootFor("akasha-introduced-")
  declaring(root, "id", { pageTypeSlug: TEXT, unique: "always" })
  declaring(root, "slug", { pageTypeSlug: TEXT, unique: "page-type" })
  for (const one of REACHED) declaring(root, one, { pageTypeSlug: TEXT })
  return root
}

function bytesOf(
  slug: string,
  above: string | null,
  declares: readonly string[],
  parts: readonly string[]
): Uint8Array {
  return new TextEncoder().encode(stated(slug, above, declares, parts))
}

function judged(change: Change): readonly Judged[] {
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  return introducedPropertyIsAPart(change, cast.shadow)
}

test("a page type naming the property it introduces among its parts is let through", () => {
  const root = rooted()
  standing(root, "held", null, ["mine"], ["text-property/mine"])
  const said = judged(
    landing(root, { [pathFor("held")]: bytesOf("held", null, ["mine"], ["text-property/mine"]) })
  )
  expect(said).toEqual([])
})

test("a page type introducing a property it does not part is refused", () => {
  const root = rooted()
  standing(root, "held", null, ["mine"], [])
  const said = judged(landing(root, { [pathFor("held")]: bytesOf("held", null, ["mine"], []) }))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`mine`")
  expect(said[0]?.path).toBe(pathFor("held"))
})

test("a property restated to narrow it is inherited, not introduced", () => {
  const root = rooted()
  standing(root, "over", null, ["mine"], ["text-property/mine"])
  standing(root, "under", "over", ["mine"], [])
  const said = judged(landing(root, { [pathFor("under")]: bytesOf("under", "over", ["mine"], []) }))
  expect(said).toEqual([])
})

test("a property restated under a page type the same change adds is inherited, not introduced", () => {
  const root = rooted()
  const said = judged(
    landing(root, {
      [pathFor("over")]: bytesOf("over", null, ["mine"], ["text-property/mine"]),
      [pathFor("under")]: bytesOf("under", "over", ["mine"], []),
    })
  )
  expect(said).toEqual([])
})

test("a page type the same change adds does not hide the introducer above it", () => {
  const root = rooted()
  const said = judged(
    landing(root, {
      [pathFor("over")]: bytesOf("over", null, ["mine"], []),
      [pathFor("under")]: bytesOf("under", "over", ["mine"], []),
    })
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(pathFor("over"))
  expect(said[0]?.reason).toContain("`mine`")
})

test("a property two page types introduce is passed over", () => {
  const root = rooted()
  standing(root, "one", null, ["shared"], [])
  standing(root, "two", null, ["shared"], [])
  const said = judged(landing(root, { [pathFor("one")]: bytesOf("one", null, ["shared"], []) }))
  expect(said).toEqual([])
})

test("a type that stops introducing a property leaves the other introducer refused", () => {
  const root = rooted()
  standing(root, "one", null, ["shared"], [])
  standing(root, "two", null, ["shared"], [])
  const said = judged(landing(root, { [pathFor("one")]: bytesOf("one", null, [], []) }))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(pathFor("two"))
})

test("a part is matched by the slug it addresses, whatever page type it names", () => {
  const root = rooted()
  standing(root, "held", null, ["mine"], ["number-property/mine"])
  const said = judged(
    landing(root, { [pathFor("held")]: bytesOf("held", null, ["mine"], ["number-property/mine"]) })
  )
  expect(said).toEqual([])
})

test("a part is matched by the slug it addresses, whatever page type the declaration names", () => {
  const root = rooted()
  standing(root, "held", null, [QUALIFIED], [QUALIFIED])
  const said = judged(
    landing(root, { [pathFor("held")]: bytesOf("held", null, [QUALIFIED], [QUALIFIED]) })
  )
  expect(said).toEqual([])
})

test("a page type declaring a property by page type and parting nothing is still refused", () => {
  const root = rooted()
  standing(root, "held", null, [QUALIFIED], [])
  const said = judged(landing(root, { [pathFor("held")]: bytesOf("held", null, [QUALIFIED], []) }))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain(`\`${QUALIFIED}\``)
  expect(said[0]?.path).toBe(pathFor("held"))
})

test("a declaration naming its page type and a bare one reach the same property", () => {
  const root = rooted()
  standing(root, "over", null, [QUALIFIED], [QUALIFIED])
  standing(root, "under", "over", ["foo"], [])
  const said = judged(landing(root, { [pathFor("under")]: bytesOf("under", "over", ["foo"], []) }))
  expect(said).toEqual([])
})

test("a change carrying no page type is passed over", () => {
  const root = rooted()
  standing(root, "held", null, ["mine"], [])
  expect(judged(landing(root, { "akasha/held.domain.ts": NO_BYTES }))).toEqual([])
})

test("a page type the change takes away is not judged", () => {
  const root = rooted()
  standing(root, "held", null, ["mine"], [])
  standing(root, "other", null, ["its"], ["text-property/its"])
  const said = judged(
    landing(
      root,
      {
        [pathFor("held")]: null,
        [pathFor("other")]: bytesOf("other", null, ["its"], ["text-property/its"]),
      },
      { [pathFor("held")]: bytesOf("held", null, ["mine"], []) }
    )
  )
  expect(said).toEqual([])
})

test("what a page type declares and parts is read off its body", () => {
  expect(
    declaresIn({ properties: [{ pagePropertySlug: "one" }, { pagePropertySlug: "two" }] })
  ).toEqual(["one", "two"])
  expect(declaresIn(null)).toEqual([])
  expect([...partedIn({ partSlugs: ["text-property/one", "module/two"] })]).toEqual(["one", "two"])
  expect([...partedIn({})]).toEqual([])
})

test("only a page-type page inside the akasha folder is named", () => {
  expect(typeNamedIn("akasha/a/b/check.page-type.ts")).toBe("check")
  expect(typeNamedIn("akasha/held.domain.ts")).toBeNull()
  expect(typeNamedIn("pages/held.page-type.ts")).toBeNull()
})
