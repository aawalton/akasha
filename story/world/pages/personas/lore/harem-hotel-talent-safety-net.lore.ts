import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const haremHotelTalentSafetyNet = {
  id: "01a0de01-b455-79b2-acd2-60099088317d",
  type: "page-type/lore",
  slug: "harem-hotel-talent-safety-net",
  title: "Talent Activation Safety Net",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Each companion's arc spans five floors from her arrival: floors 1 to 5, 6 to 10, 11 to 15 and on.",
    "If a companion's talent has not fired by her set's last floor, the System gives her a quest.",
    "That quest appears on her own pane, in the System's mute quest form.",
    "That quest points her in the right direction and never names her talent's trigger.",
    "A talent that fires before its set's last floor never draws that quest.",
    "No talent's activation conditions are ever told to Alan before the talent first fires.",
  ],
} as const satisfies Lore
