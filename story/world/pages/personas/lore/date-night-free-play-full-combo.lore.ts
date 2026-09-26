import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const dateNightFreePlayFullCombo = {
  id: "01a0de0b-fbb4-7cdf-807b-296a0256cf31",
  type: "page-type/lore",
  slug: "date-night-free-play-full-combo",
  title: "Full Combo",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/player",
  facts: [
    "Full Combo is Aura's arcade.",
    "After hours Full Combo is dark except the cabinets, every machine set to free play.",
    "Upstairs at Full Combo is a bed by a window over the dark cabinets.",
    "Cabinet-blue light reaches the room upstairs, and the empty arcade hums below it.",
    "Full Combo's back door sticks.",
    "A rhythm cabinet at Full Combo shows a 942k score Aura has not cleared.",
  ],
} as const satisfies Lore
