import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const characterSkill = {
  id: "01a10362-0c7c-73f8-a241-d557905e128b",
  type: "page-type/page-type",
  slug: "character-skill",
  definition: "a skill one character holds, as a holding of the world's skills",
  pluralSlug: "skills-held",
  extends: ["page-type/world-skill"],
  parts: ["relation-property/skill-character", "relation-property/held-skill"],
  properties: [
    { pageProperty: "relation-property/skill-character", required: true, many: false },
    { pageProperty: "relation-property/held-skill", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story with no skill kind of its own holds its skills as pages of this kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A holding's slug is its character's slug, then the skill it names.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
