import { expect, test } from "bun:test"
import {
  asksRemoval,
  decideImage,
  GRACE_MS,
  type GradedF,
  gradedAtIn,
  namersIn,
  removalFor,
} from "akasha/infrastructure/inference/generation/image/modules/graded-f-sweeping/graded-f-sweeping.module.code.ts"

const NOW = Date.parse("2026-09-26T12:00:00Z")

const PAGE = "infrastructure/inference/generation/image/pages/image-0123456789abcdef.image.ts"

function gradedAgo(ms: number | null, namedBy: readonly string[] = []): GradedF {
  return {
    relPath: PAGE,
    slug: "image-0123456789abcdef",
    gradedAtMs: ms === null ? null : NOW - ms,
    namedBy,
  }
}

test("An image goes where its grade is `F` and was written fifteen minutes ago or more.", () => {
  expect(GRACE_MS).toBe(15 * 60_000)
  expect(decideImage(gradedAgo(GRACE_MS), NOW)).toBe("delete")
  expect(decideImage(gradedAgo(GRACE_MS * 10), NOW)).toBe("delete")
})

test("An image graded `F` fewer than fifteen minutes ago stays.", () => {
  expect(decideImage(gradedAgo(GRACE_MS - 1), NOW)).toBe("young")
  expect(decideImage(gradedAgo(0), NOW)).toBe("young")
})

test("When a grade was written is read off the last commit to the image's page.", () => {
  expect(gradedAtIn("1790000000\n")).toBe(1_790_000_000_000)
})

test("An image whose last commit went unread stays and is named.", () => {
  expect(gradedAtIn(null)).toBeNull()
  expect(gradedAtIn("\n")).toBeNull()
  expect(gradedAtIn("not a time")).toBeNull()
  expect(decideImage(gradedAgo(null), NOW)).toBe("unjudged")
})

test("An image another page names stays graded `F`, and the sweep names each page naming it.", () => {
  const lines = [
    '{"propertySlug":"cover-images","path":"persona/pages/elin/elin.persona.ts","id":"019f2ddc-5bad-745b-8e96-cf5a9a9343f2"}',
    '{"propertySlug":"anchor-image","path":"persona/pages/elin/elin.persona.ts","id":"019f2ddc-5bad-745b-8e96-cf5a9a9343f2"}',
    '{"propertySlug":"input-image","path":"infrastructure/inference/generation/image/pages/image-fedcba9876543210.image.ts"}',
    "",
  ].join("\n")
  const named = namersIn(lines)
  expect(named).toEqual([
    "image/image-fedcba9876543210 (input-image)",
    "persona/elin (anchor-image)",
    "persona/elin (cover-images)",
  ])
  expect(decideImage(gradedAgo(GRACE_MS * 10, named), NOW)).toBe("named")
  expect(namersIn("")).toEqual([])
})

test("The removal states the commit the checkout was at before its images were read.", () => {
  const read = "f".repeat(40)
  const asked = removalFor([PAGE], read)
  expect(asked.removes).toEqual([PAGE])
  expect(asked.read).toBe(read)
  expect(asked.message).toContain("image-0123456789abcdef")
})

test("Nothing is deleted unless the sweep is asked to.", () => {
  expect(asksRemoval([])).toBe(false)
  expect(asksRemoval(["--dry"])).toBe(false)
  expect(asksRemoval(["--remove"])).toBe(true)
})
