import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveWizardUniversityRequirement = {
  id: "01a0e9fb-2b67-74a1-898a-1d84df1eba01",
  type: "page-type/world-mechanic",
  slug: "super-supportive-wizard-university-requirement",
  title: "Wizard university entry requirement",
  world: "world/super-supportive",
  description:
    "The rule that a wizard must be able to provide food, water, shelter and protection before entering a university.",
} as const satisfies WorldMechanic
