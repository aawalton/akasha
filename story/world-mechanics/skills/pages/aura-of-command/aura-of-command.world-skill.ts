import type { WorldSkill } from "../../world-skill.page-type.ts"

export const auraOfCommand = {
  id: "01a06575-97ee-73d5-a416-c950a51deb30",
  pageTypeSlug: "world-skill",
  slug: "aura-of-command",
  title: "Aura of Command",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["aura-of-the-emissary"],
  references: "jsonl",
} as const satisfies WorldSkill
