import { expect, test } from "bun:test"
import { addImageCommand } from "akasha/change/agent/file/add-image/add-image.change-agent.code.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { imageSlugOf } from "akasha/infrastructure/inference/generation/image/modules/picture-landing/picture-landing.module.code.ts"

const TYPE_AT = "infrastructure/inference/generation/image/image.page-type.ts"

const FROM = "/home/one/photo.png"

const PNG = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1, 2, 3])

const SLUG = imageSlugOf(PNG)

const PAGE_AT = `infrastructure/inference/generation/image/pages/${SLUG}.image.ts`

function worldOf(images: readonly string[]): World {
  const listedAt = (kind: string, slug: string): readonly { readonly path: string }[] => {
    if (kind === "page-type" && slug === "image") return [{ path: TYPE_AT }]
    if (kind === "image" && images.includes(slug)) return [{ path: PAGE_AT }]
    return []
  }
  return {
    root: "/nowhere",
    index: Object.assign({} as World["index"], { listedAt }),
    textOf: () => null,
    bodyOf: () => null,
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
  }
}

test("a picture is answered as its page and its bytes brought in beside it", () => {
  const said = addImageCommand(worldOf([]), { from: FROM, title: 'A "view"' }, PNG)

  expect(said.refused).toBeNull()
  expect(said.edits.map((one) => one.kind)).toEqual(["add", "bring"])
  expect(said.edits[1]).toEqual({
    kind: "bring",
    path: `infrastructure/inference/generation/image/pages/${SLUG}.image.bytes.uncommitted.png`,
    pathFrom: FROM,
  })
})

test("the page is named for the picture's bytes and states the title handed in", () => {
  const said = addImageCommand(worldOf([]), { from: FROM, title: 'A "view"' }, PNG)
  const page = said.edits[0]

  expect(page?.kind === "add" ? page.path : null).toBe(PAGE_AT)
  expect(page?.kind === "add" ? page.content : "").toContain(`slug: "${SLUG}",`)
  expect(page?.kind === "add" ? page.content : "").toContain('title: "A \\"view\\"",')
  expect(page?.kind === "add" ? page.content : "").not.toContain("id:")
})

test("a picture some image page is named for already is refused", () => {
  const said = addImageCommand(worldOf([SLUG]), { from: FROM }, PNG)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/a page already/)
})

test("bytes that are neither png nor jpg are refused", () => {
  const said = addImageCommand(worldOf([]), { from: FROM }, new Uint8Array([1, 2, 3]))

  expect(said.refused ?? "").toMatch(/neither png nor jpg/)
})

test("a from that is not a whole path is refused", () => {
  const said = addImageCommand(worldOf([]), { from: "photo.png" }, PNG)

  expect(said.refused ?? "").toMatch(/not a whole path/)
})

test("a from holding no file is refused", () => {
  const said = addImageCommand(worldOf([]), { from: FROM }, null)

  expect(said.refused ?? "").toMatch(/holds no file/)
})

test("arguments holding no from are refused by the name of the argument", () => {
  const said = addImageCommand(worldOf([]), {}, PNG)

  expect(said.refused ?? "").toMatch(/`from`/)
})
