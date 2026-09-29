import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereXiCalendar = {
  id: "01a0ea85-ad40-7ef3-8a3f-f64a14744d67",
  type: "page-type/world-mechanic",
  slug: "otherwhere-xi-calendar",
  title: "Calendar",
  world: "world/the-calamitous-bob-stubbed",
  description: "How people count days, months, seasons and years, and the festivals they keep.",
} as const satisfies WorldMechanic
