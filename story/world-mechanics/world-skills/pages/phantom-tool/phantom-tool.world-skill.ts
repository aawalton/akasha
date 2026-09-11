import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const phantomTool = {
  id: "01a0657d-0290-7e94-9426-c403fa47179a",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "phantom-tool",
  title: "Phantom Tool",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
