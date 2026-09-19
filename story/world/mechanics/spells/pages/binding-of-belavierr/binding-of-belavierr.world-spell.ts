import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const bindingOfBelavierr = {
  id: "01a06572-95b6-7091-af06-5c71b9795556",
  type: "page-type/world-spell",
  slug: "binding-of-belavierr",
  title: "Binding of Belavierr",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
