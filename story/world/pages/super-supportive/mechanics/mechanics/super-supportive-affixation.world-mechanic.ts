import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveAffixation = {
  id: "01a0e9f0-3df9-7aa9-9204-26779982515a",
  type: "page-type/world-mechanic",
  slug: "super-supportive-affixation",
  title: "Affixation",
  world: "world/super-supportive",
  aliases: ["affixing", "finalize affixation"],
  description: "The binding of a person's chosen class, skills and stat points into them for good.",
  createdAt: "2026-09-28T21:33:50.969Z",
  updatedAt: "2026-09-28T21:33:54.000Z",
} as const satisfies WorldMechanic
