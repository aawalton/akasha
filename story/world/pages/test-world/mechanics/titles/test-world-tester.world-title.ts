import type { WorldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.types.ts"

export const testWorldTester = {
  id: "01a17ec5-a3e5-7353-b6a0-c0191574891f",
  type: "page-type/world-title",
  slug: "test-world-tester",
  title: "Tester",
  world: "world/test-world",
  description: "A name the town gives someone who tries every door twice.",
  createdAt: "2026-10-27T19:10:44.195Z",
  updatedAt: "2026-10-27T19:10:44.195Z",
} as const satisfies WorldTitle
