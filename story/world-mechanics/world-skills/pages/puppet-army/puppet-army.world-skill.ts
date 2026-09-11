import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const puppetArmy = {
  id: "01a0657d-029a-7026-89ee-fc09e0d691a2",
  type: "world-skill",
  slug: "puppet-army",
  title: "Puppet Army",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
