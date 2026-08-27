import { expect, test } from "bun:test"
import {
  buildVersionedReloadUrl,
  parseBuildSha,
  shouldPromptVersionUpdate,
} from "./app-version-check.pure"

const SHA_A = "abc1234567890abc1234567890abc1234567890a"
const SHA_B = "def4567890abc1234567890abc1234567890abcd"

test("parseBuildSha accepts a 40-char lowercase hex SHA", () => {
  expect(parseBuildSha(SHA_A)).toBe(SHA_A)
})

test("parseBuildSha rejects empty / short / uppercase / undefined", () => {
  expect(parseBuildSha("")).toBeNull()
  expect(parseBuildSha(undefined)).toBeNull()
  expect(parseBuildSha("abc1234")).toBeNull()
  expect(parseBuildSha(SHA_A.toUpperCase())).toBeNull()
  expect(parseBuildSha(`${SHA_A}extra`)).toBeNull()
})

test("shouldPromptVersionUpdate prompts when live version differs from the build SHA", () => {
  expect(
    shouldPromptVersionUpdate({ buildSha: SHA_A, liveVersion: SHA_B, alreadyDetected: false })
  ).toBe(true)
})

test("shouldPromptVersionUpdate stays silent when live version equals the build SHA", () => {
  expect(
    shouldPromptVersionUpdate({ buildSha: SHA_A, liveVersion: SHA_A, alreadyDetected: false })
  ).toBe(false)
})

test("shouldPromptVersionUpdate stays silent with no build SHA (dev / inert)", () => {
  expect(
    shouldPromptVersionUpdate({ buildSha: null, liveVersion: SHA_B, alreadyDetected: false })
  ).toBe(false)
})

test("shouldPromptVersionUpdate stays silent when live version is not yet a string", () => {
  expect(
    shouldPromptVersionUpdate({ buildSha: SHA_A, liveVersion: undefined, alreadyDetected: false })
  ).toBe(false)
  expect(
    shouldPromptVersionUpdate({ buildSha: SHA_A, liveVersion: null, alreadyDetected: false })
  ).toBe(false)
})

test("shouldPromptVersionUpdate latches — no re-prompt once already detected", () => {
  expect(
    shouldPromptVersionUpdate({ buildSha: SHA_A, liveVersion: SHA_B, alreadyDetected: true })
  ).toBe(false)
})

test("buildVersionedReloadUrl sets a namespaced __v cache-bust param", () => {
  expect(buildVersionedReloadUrl("https://alanwalton.com/dashboard", SHA_B)).toBe(
    `https://alanwalton.com/dashboard?__v=${SHA_B}`
  )
})

test("buildVersionedReloadUrl overwrites a stale __v and preserves path, hash, and other params", () => {
  expect(buildVersionedReloadUrl(`https://alanwalton.com/x?tab=2&__v=${SHA_A}#frag`, SHA_B)).toBe(
    `https://alanwalton.com/x?tab=2&__v=${SHA_B}#frag`
  )
})
