import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveWizardClass = {
  id: "01a0e9f5-fdec-7ae6-a5f7-07ad18a14939",
  type: "page-type/world-class",
  slug: "super-supportive-wizard-class",
  title: "wizard class",
  world: "world/super-supportive",
  aliases: ["wizard birthclass", "wizarding classes", "higher class"],
  description: "The Artonan class of spellcasters, set apart from the ordinary class.",
} as const satisfies WorldClass
