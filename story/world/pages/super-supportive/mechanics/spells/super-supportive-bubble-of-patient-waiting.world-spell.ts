import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveBubbleOfPatientWaiting = {
  id: "01a0e9f2-f147-754d-ac67-48fcd9de771c",
  type: "page-type/world-spell",
  slug: "super-supportive-bubble-of-patient-waiting",
  title: "Bubble of Patient Waiting",
  world: "world/super-supportive",
  aliases: ["magic preservation bubble", "the bubble"],
  description:
    "An Adjuster spell making a glittering silver globe that keeps everything inside from changing.",
} as const satisfies WorldSpell
