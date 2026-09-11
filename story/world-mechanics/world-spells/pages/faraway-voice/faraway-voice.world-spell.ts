import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const farawayVoice = {
  id: "01a06572-95c0-7095-b0cd-94aae1ac0131",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "faraway-voice",
  title: "Faraway Voice",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
