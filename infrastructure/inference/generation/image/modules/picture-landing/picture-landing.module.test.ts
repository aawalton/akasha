import { expect, test } from "bun:test"
import {
  endingOf,
  type ImageDeps,
  imageSlugOf,
  landImage,
} from "akasha/infrastructure/inference/generation/image/modules/picture-landing/picture-landing.module.code.ts"

const PNG = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1, 2, 3])

const JPG = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 4, 5, 6])

function deps(there: boolean): ImageDeps & { readonly did: string[] } {
  const did: string[] = []
  let placed = there
  return {
    did,
    pathOf: async (slug) => (placed ? `pages/${slug}.image.ts` : null),
    landPage: async (slug, values) => {
      did.push(`land ${slug} ${JSON.stringify(values)}`)
      placed = true
    },
    place: async (slug, ending) => {
      did.push(`place ${slug} ${ending}`)
      return `pages/${slug}.image.bytes.uncommitted.${ending}`
    },
  }
}

test("the ending is read off the bytes", () => {
  expect(endingOf(PNG)).toBe("png")
  expect(endingOf(JPG)).toBe("jpg")
  expect(endingOf(new Uint8Array([1, 2, 3, 4]))).toBeNull()
})

test("the slug opens with image- and the first sixteen hex of the sha256", () => {
  expect(imageSlugOf(PNG)).toMatch(/^image-[0-9a-f]{16}$/)
  expect(imageSlugOf(PNG)).toBe(imageSlugOf(new Uint8Array(PNG)))
  expect(imageSlugOf(PNG)).not.toBe(imageSlugOf(JPG))
})

test("a picture nothing holds lands a page with its values, then its bytes", async () => {
  const held = deps(false)
  const done: string[] = []
  const landed = await landImage(held, JPG, { grade: "A" }, done)
  const slug = imageSlugOf(JPG)
  expect(landed).toEqual({ slug, at: `pages/${slug}.image.bytes.uncommitted.jpg` })
  expect(held.did).toEqual([`land ${slug} {"grade":"A"}`, `place ${slug} jpg`])
  expect(done).toHaveLength(2)
})

test("a picture already held lands no second page", async () => {
  const held = deps(true)
  const done: string[] = []
  await landImage(held, PNG, {}, done)
  expect(held.did).toEqual([`place ${imageSlugOf(PNG)} png`])
  expect(done[0]).toContain("already there")
})

test("bytes that are neither png nor jpg are refused before anything lands", async () => {
  const held = deps(false)
  await expect(landImage(held, new Uint8Array([1, 2, 3]), {}, [])).rejects.toThrow("neither")
  expect(held.did).toEqual([])
})
