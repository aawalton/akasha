import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVWizardry = {
  id: "01a0e9f4-8e70-7d6d-ba7a-4042226943c4",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-wizardry",
  title: "Wizardry",
  world: "world/ends-of-magic",
  aliases: ["true wizardry"],
  description: "A higher realm of magic.",
} as const satisfies WorldMechanic
