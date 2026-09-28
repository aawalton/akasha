import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveFeathersTouch = {
  id: "01a0e9f2-f147-7998-9318-39f67d901bc9",
  type: "page-type/world-spell",
  slug: "super-supportive-feathers-touch",
  title: "Feather's Touch",
  world: "world/super-supportive",
  description:
    "A wordchain whose one half makes skin extremely sensitive and whose other half makes it numb.",
} as const satisfies WorldSpell
