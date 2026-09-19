import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const conjurePerfectPuppetTheDuke = {
  id: "01a06572-95ba-7fba-bf8c-1b10a6c437a7",
  type: "page-type/world-spell",
  slug: "conjure-perfect-puppet-the-duke",
  title: "Conjure Perfect Puppet: The Duke",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
