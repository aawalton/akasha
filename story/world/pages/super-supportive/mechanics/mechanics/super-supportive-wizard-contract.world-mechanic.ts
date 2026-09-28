import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveWizardContract = {
  id: "01a0e9f1-cfc3-704e-9f53-733bc11556c9",
  type: "page-type/world-mechanic",
  slug: "super-supportive-wizard-contract",
  title: "Wizard's contract",
  world: "world/super-supportive",
  aliases: ["private contract", "magical contract", "un-moderated magical contract"],
  description:
    "A magical agreement between parties, marked with contract tattoos, without full System oversight.",
} as const satisfies WorldMechanic
