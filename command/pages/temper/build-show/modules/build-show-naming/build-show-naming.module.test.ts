import { expect, test } from "bun:test"
import {
  AS_HASH,
  type Named,
  namedIn,
} from "akasha/command/pages/temper/build-show/modules/build-show-naming/build-show-naming.module.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import { maxMaxStamina } from "akasha/temper/player/character/character-build/pages/max-max-stamina/max-max-stamina.character-build.ts"
import { healerBuild } from "akasha/temper/player/character/companion-build/pages/healer-build/healer-build.companion-build.ts"
import { archmageAmerys } from "akasha/temper/player/character/temper-account-character/pages/archmage-amerys/archmage-amerys.temper-account-character.ts"

const ROOT = codeRoot()

function named(said: string): Named {
  const naming = namedIn(ROOT, said)
  if ("refused" in naming) throw new Error(naming.refused)
  return naming.named
}

test("a character build's slug names that build's hash, with no stars", () => {
  const found = named(maxMaxStamina.slug)

  expect(found.hash).toBe(maxMaxStamina.buildHash)
  expect(found.source).toBe(`character-build ${maxMaxStamina.slug}`)
  expect(found.stars).toBeNull()
})

test("a companion build's slug names that build's hash", () => {
  expect(named(healerBuild.slug).hash).toBe(healerBuild.buildHash)
})

test("a character stating no live build names its newest reading, with that reading's stars", () => {
  const found = named(archmageAmerys.slug)

  expect(found.source).toStartWith("newest reading ")
  expect(found.hash.length).toBeGreaterThan(0)
  expect(found.stars).not.toBeNull()
})

test("the start of a reading's id names that reading", () => {
  const newest = named(archmageAmerys.slug)
  const start = newest.source.split(" ")[2] ?? ""
  const found = named(start)

  expect(found.source).toStartWith(`reading ${start} `)
  expect(found.hash).toBe(newest.hash)
})

test("a word naming no page or reading is taken as a hash", () => {
  const found = named("ATQKpJcAAIB")

  expect(found.source).toBe(AS_HASH)
  expect(found.hash).toBe("ATQKpJcAAIB")
})
