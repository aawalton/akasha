import type { WorldSpell } from "../../world-spell.page-type.ts"

export const meteorSwarm = {
  id: "01a06572-95d8-7419-9d50-1f9e298fe1ce",
  pageTypeSlug: "world-spell",
  slug: "meteor-swarm",
  title: "Meteor Swarm",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
