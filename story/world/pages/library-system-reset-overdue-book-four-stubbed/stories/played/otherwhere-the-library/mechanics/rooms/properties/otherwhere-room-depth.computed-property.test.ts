import { expect, test } from "bun:test"
import type { Reach } from "akasha/page/computed-property/computed-property.page-type.ts"
import { otherwhereMainHall } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-the-library/mechanics/rooms/pages/otherwhere-main-hall.otherwhere-room.ts"
import { work } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-the-library/mechanics/rooms/properties/otherwhere-room-depth.computed-property.code.ts"

function reaching(depth: number | null): Reach {
  return {
    target: () => null,
    through: <Held>(relationKey: string, key: string): Held | null =>
      relationKey === "place" && key === "depth" ? (depth as Held | null) : null,
    naming: () => [],
    file: () => null,
    folder: () => null,
  }
}

test("a room takes the depth its place states", () => {
  expect(work(otherwhereMainHall, reaching(-1))).toBe(-1)
})

test("a room whose place states no depth has none", () => {
  expect(work(otherwhereMainHall, reaching(null))).toBeNull()
})
