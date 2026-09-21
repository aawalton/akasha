import { expect, test } from "bun:test"
import {
  imageSlugOf,
  type PersistImageDeps,
  persistInferenceImage,
} from "akasha/infrastructure/inference/run/modules/persist-image/persist-image.module.code.ts"

const BYTES = new TextEncoder().encode("a picture")

const PAGE_AT = `infrastructure/inference/generation/image/pages/${imageSlugOf(BYTES)}.image.ts`

function deps(there: boolean): PersistImageDeps & { readonly did: string[] } {
  const did: string[] = []
  let placed = there
  return {
    did,
    pathOf: async () => (placed ? PAGE_AT : null),
    landPage: async (slug) => {
      did.push(`land ${slug}`)
      placed = true
    },
    placeBytes: async (at) => {
      did.push(`place ${at}`)
    },
  }
}

test("the slug opens with image- and the first sixteen hex of the sha256", () => {
  expect(imageSlugOf(BYTES)).toMatch(/^image-[0-9a-f]{16}$/)
  expect(imageSlugOf(BYTES)).toBe(imageSlugOf(new Uint8Array(BYTES)))
})

test("a picture nothing holds lands a page, then its bytes beside that page", async () => {
  const held = deps(false)
  const done: string[] = []
  const slug = await persistInferenceImage(held, BYTES, done)
  expect(slug).toBe(imageSlugOf(BYTES))
  expect(held.did).toEqual([
    `land ${slug}`,
    `place ${PAGE_AT.replace(/\.ts$/, ".bytes.uncommitted.png")}`,
  ])
  expect(done).toHaveLength(2)
})

test("a picture already held lands no second page", async () => {
  const held = deps(true)
  const done: string[] = []
  await persistInferenceImage(held, BYTES, done)
  expect(held.did).toEqual([`place ${PAGE_AT.replace(/\.ts$/, ".bytes.uncommitted.png")}`])
  expect(done[0]).toContain("already there")
})
