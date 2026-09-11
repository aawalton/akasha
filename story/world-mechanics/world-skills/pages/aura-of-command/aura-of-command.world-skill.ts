import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const auraOfCommand = {
  id: "01a06575-97ee-73d5-a416-c950a51deb30",
  type: "world-skill",
  slug: "aura-of-command",
  title: "Aura of Command",
  world: "the-wandering-inn",
  evolvesToSlugs: ["aura-of-the-emissary"],
  references: "jsonl",
} as const satisfies WorldSkill
