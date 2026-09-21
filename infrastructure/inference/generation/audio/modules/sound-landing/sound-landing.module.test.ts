import { expect, test } from "bun:test"
import {
  audioSlugOf,
  landSound,
  type SoundDeps,
} from "akasha/infrastructure/inference/generation/audio/modules/sound-landing/sound-landing.module.code.ts"

function wav(mark: number): Uint8Array {
  const bytes = new Uint8Array(64)
  bytes.set([0x52, 0x49, 0x46, 0x46], 0)
  bytes[63] = mark
  return bytes
}

const ONE = wav(1)

const TWO = wav(2)

function deps(there: boolean): SoundDeps & { readonly did: string[] } {
  const did: string[] = []
  let placed = there
  return {
    did,
    pathOf: async (slug) => (placed ? `pages/${slug}.audio.ts` : null),
    landPage: async (slug, values) => {
      did.push(`land ${slug} ${JSON.stringify(values)}`)
      placed = true
    },
    place: async (slug) => {
      did.push(`place ${slug}`)
      return `pages/${slug}.audio.bytes.uncommitted.wav`
    },
  }
}

test("the slug opens with audio- and the first sixteen hex of the sha256", () => {
  expect(audioSlugOf(ONE)).toMatch(/^audio-[0-9a-f]{16}$/)
  expect(audioSlugOf(ONE)).toBe(audioSlugOf(new Uint8Array(ONE)))
  expect(audioSlugOf(ONE)).not.toBe(audioSlugOf(TWO))
})

test("a sound nothing holds lands a page with its values, then its bytes", async () => {
  const held = deps(false)
  const done: string[] = []
  const landed = await landSound(held, ONE, { title: "a tune" }, done)
  const slug = audioSlugOf(ONE)
  expect(landed).toEqual({ slug, at: `pages/${slug}.audio.bytes.uncommitted.wav` })
  expect(held.did).toEqual([`land ${slug} {"title":"a tune"}`, `place ${slug}`])
  expect(done).toHaveLength(2)
})

test("a sound already held lands no second page", async () => {
  const held = deps(true)
  const done: string[] = []
  await landSound(held, TWO, {}, done)
  expect(held.did).toEqual([`place ${audioSlugOf(TWO)}`])
  expect(done[0]).toContain("already there")
})

test("bytes that are no wav are refused before anything lands", async () => {
  const held = deps(false)
  await expect(landSound(held, new Uint8Array([1, 2, 3]), {}, [])).rejects.toThrow("not one")
  expect(held.did).toEqual([])
})
