import { expect, test } from "bun:test"
import { claimant, type PageType, typeSlotOf } from "./markdown-page-types.module.code.ts"

function typeNamed(slug: string): PageType {
  return {
    slug,
    relPath: `pages/page-type/${slug}.page-type.md`,
    filed: [],
    extends: null,
    namedFor: null,
  }
}

test("a markdown page's name carries its page type", () => {
  expect(typeSlotOf("pages/daily-tracking/2026-03-05.daily-tracking.md")).toBe("daily-tracking")
  expect(typeSlotOf("2026-03-05.daily-tracking.md")).toBe("daily-tracking")
})

test("an akasha page's name carries its page type", () => {
  expect(
    typeSlotOf(
      "akasha/alan/daily-tracking/daily-trackings/day-2026-03-05/day-2026-03-05.daily-tracking.ts"
    )
  ).toBe("daily-tracking")
  expect(typeSlotOf("akasha/t/s.spark.ts")).toBe("spark")
})

test("a file standing beside a page carries no page type", () => {
  expect(typeSlotOf("akasha/pages-system/pages/beside/page-beside.module.code.ts")).toBeNull()
  expect(typeSlotOf("akasha/pages-system/pages/beside/page-beside.module.test.ts")).toBeNull()
  expect(
    typeSlotOf(
      "akasha/alan/daily-tracking/daily-trackings/day-2026-03-05/day-2026-03-05.daily-tracking.sessions.jsonl"
    )
  ).toBeNull()
})

test("a file naming no page type at all carries none", () => {
  expect(typeSlotOf("akasha/t/held.ts")).toBeNull()
  expect(typeSlotOf("tools/lib/page-write-where.ts")).toBeNull()
  expect(typeSlotOf("README.md")).toBeNull()
})

test("a `.ts` name is claimed only where its page type stands here", () => {
  const types = [typeNamed("daily-tracking")]
  const claimed = claimant(
    "akasha/alan/daily-tracking/daily-trackings/day-2026-03-05/day-2026-03-05.daily-tracking.ts",
    types
  )
  expect(claimed.slug).toBe("daily-tracking")
  expect(claimed.why).toBeNull()
  const stray = claimant("collections/music/src/listening/rows.server.ts", types)
  expect(stray.type).toBeNull()
  expect(stray.why).toBe("its name carries `server`, which names no page type here")
})
