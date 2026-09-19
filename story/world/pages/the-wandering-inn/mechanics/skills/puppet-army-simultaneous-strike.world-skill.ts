import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const puppetArmySimultaneousStrike = {
  id: "01a0657d-029a-762f-a922-22bdf60328d2",
  type: "page-type/world-skill",
  slug: "puppet-army-simultaneous-strike",
  title: "Puppet Army: Simultaneous Strike!",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
