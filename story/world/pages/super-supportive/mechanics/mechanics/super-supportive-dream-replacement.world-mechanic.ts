import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveDreamReplacement = {
  id: "01a0e9fb-2b66-78cf-803f-13fb050aac3f",
  type: "page-type/world-mechanic",
  slug: "super-supportive-dream-replacement",
  title: "Nightmare replacement",
  world: "world/super-supportive",
  aliases: ["dream building", "implanting new dreams"],
  description:
    "A mind healer inducing a patient's nightmare in sleep and replacing it with correcting dreams the patient chose.",
} as const satisfies WorldMechanic
