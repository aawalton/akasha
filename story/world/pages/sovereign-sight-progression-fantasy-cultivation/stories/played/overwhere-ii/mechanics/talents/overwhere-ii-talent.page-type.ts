import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIiTalent = {
  id: "01a0ed17-fe33-7511-a427-5770eb83aeb1",
  type: "page-type/page-type",
  slug: "overwhere-ii-talent",
  definition: "one Talent a character in Overwhere II holds, at its Depth, reach and draw",
  pluralSlug: "talents",
  extends: ["page-type/world-skill"],
  parts: [
    "relation-property/overwhere-ii-talent-character",
    "relation-property/overwhere-ii-talent-talent",
    "text-property/overwhere-ii-talent-depth",
    "number-property/overwhere-ii-talent-reach-feet",
    "number-property/overwhere-ii-talent-draw",
  ],
  properties: [
    {
      pageProperty: "relation-property/overwhere-ii-talent-character",
      required: true,
      many: false,
    },
    { pageProperty: "relation-property/overwhere-ii-talent-talent", required: true, many: false },
    { pageProperty: "text-property/overwhere-ii-talent-depth", required: true, many: false },
    {
      pageProperty: "number-property/overwhere-ii-talent-reach-feet",
      required: true,
      many: false,
    },
    { pageProperty: "number-property/overwhere-ii-talent-draw", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A Talent page ties one Talent to its holder, at the Depth the holder has reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Depths run Surface, then First Depth through Ninth Depth.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Reach is how far from its holder a working lands; draw is the most one working moves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every change is written on its page before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No Depth, reach or draw is ever named in the prose as a number.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
