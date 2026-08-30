import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { landing, NO_BYTES } from "../../check-scratch/check-scratch.module.code.ts"
import {
  declaresIn,
  introducedPropertyIsAPart,
  partedIn,
  typeNamedIn,
} from "./introduced-property-is-a-part.check.code.ts"

const SCRATCH_AT = "/var/tmp"

const INDEX = join(".git", "data", "index")

const held: string[] = []

afterAll(() => {
  for (const one of held) rmSync(one, { recursive: true, force: true })
})

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

function schemad(root: string, propertySlug: string, unique: string): void {
  const dir = join(root, INDEX, "schema", "page-property", "slug")
  mkdirSync(dir, { recursive: true })
  const said = { pageTypeSlug: "text-property", targetPageTypeSlug: null, unique }
  writeFileSync(join(dir, `${propertySlug}.jsonl`), `${JSON.stringify(said)}\n`)
}

function standing(
  root: string,
  slug: string,
  above: string | null,
  declares: readonly string[],
  parts: readonly string[]
): void {
  const dir = join(root, INDEX, "identity", "page-type", "slug")
  mkdirSync(dir, { recursive: true })
  const path = pathFor(slug)
  writeFileSync(join(dir, `${slug}.jsonl`), `${JSON.stringify({ path, id: `id-${slug}` })}\n`)
  mkdirSync(join(root, "akasha"), { recursive: true })
  writeFileSync(join(root, path), stated(slug, above, declares, parts))
}

function rooted(): string {
  const root = mkdtempSync(join(SCRATCH_AT, "akasha-introduced-"))
  held.push(root)
  schemad(root, "id", "always")
  schemad(root, "slug", "page-type")
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

test("a page type naming the property it introduces among its parts is let through", () => {
  const root = rooted()
  standing(root, "held", null, ["mine"], ["text-property/mine"])
  const said = introducedPropertyIsAPart(
    landing(root, { [pathFor("held")]: bytesOf("held", null, ["mine"], ["text-property/mine"]) })
  )
  expect(said).toEqual([])
})

test("a page type introducing a property it does not part is refused", () => {
  const root = rooted()
  standing(root, "held", null, ["mine"], [])
  const said = introducedPropertyIsAPart(
    landing(root, { [pathFor("held")]: bytesOf("held", null, ["mine"], []) })
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`mine`")
  expect(said[0]?.path).toBe(pathFor("held"))
})

test("a property restated to narrow it is inherited, not introduced", () => {
  const root = rooted()
  standing(root, "over", null, ["mine"], ["text-property/mine"])
  standing(root, "under", "over", ["mine"], [])
  const said = introducedPropertyIsAPart(
    landing(root, { [pathFor("under")]: bytesOf("under", "over", ["mine"], []) })
  )
  expect(said).toEqual([])
})

test("a property restated under a page type the same change adds is inherited, not introduced", () => {
  const root = rooted()
  const said = introducedPropertyIsAPart(
    landing(root, {
      [pathFor("over")]: bytesOf("over", null, ["mine"], ["text-property/mine"]),
      [pathFor("under")]: bytesOf("under", "over", ["mine"], []),
    })
  )
  expect(said).toEqual([])
})

test("a page type the same change adds does not hide the introducer above it", () => {
  const root = rooted()
  const said = introducedPropertyIsAPart(
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
  const said = introducedPropertyIsAPart(
    landing(root, { [pathFor("one")]: bytesOf("one", null, ["shared"], []) })
  )
  expect(said).toEqual([])
})

test("a type that stops introducing a property leaves the other introducer refused", () => {
  const root = rooted()
  standing(root, "one", null, ["shared"], [])
  standing(root, "two", null, ["shared"], [])
  const said = introducedPropertyIsAPart(
    landing(root, { [pathFor("one")]: bytesOf("one", null, [], []) })
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(pathFor("two"))
})

test("a part is matched by the slug it addresses, whatever page type it names", () => {
  const root = rooted()
  standing(root, "held", null, ["mine"], ["number-property/mine"])
  const said = introducedPropertyIsAPart(
    landing(root, { [pathFor("held")]: bytesOf("held", null, ["mine"], ["number-property/mine"]) })
  )
  expect(said).toEqual([])
})

test("a change carrying no page type is passed over", () => {
  const root = rooted()
  standing(root, "held", null, ["mine"], [])
  expect(introducedPropertyIsAPart(landing(root, { "akasha/held.domain.ts": NO_BYTES }))).toEqual(
    []
  )
})

test("a page type the change takes away is not judged", () => {
  const root = rooted()
  standing(root, "held", null, ["mine"], [])
  standing(root, "other", null, ["its"], ["text-property/its"])
  const said = introducedPropertyIsAPart(
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
