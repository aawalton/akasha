import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereViiTechnique = {
  id: "01a0ea42-574f-7ae4-a171-8beea7d4ce9a",
  type: "page-type/page-type",
  slug: "otherwhere-vii-technique",
  definition: "one character's learned technique or spell in Otherwhere VII",
  pluralSlug: "techniques",
  extends: ["page-type/world-skill"],
  parts: [
    "relation-property/otherwhere-vii-technique-character",
    "relation-property/otherwhere-vii-technique-skill",
  ],
  properties: [
    {
      pageProperty: "relation-property/otherwhere-vii-technique-character",
      required: true,
      many: false,
    },
    {
      pageProperty: "relation-property/otherwhere-vii-technique-skill",
      required: true,
      many: false,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A technique is filed as a world-skill of the world before she can learn it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A technique needs mana, so none can be learned before she wakes to mana.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A technique is learned from a teacher, a true tome, or an enlightenment of her path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Working a technique is an action check, and spends its mana whether it works or not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A failed technique also backlashes as a light blow with no ward.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
