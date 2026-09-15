import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const appearance = {
  id: "01a0658c-fbfe-7000-a50a-efaa762bf9d7",
  type: "page-type/file-property",
  slug: "appearance",
  propertySlug: "appearance",
  definition: "what a persona looks like, written in her own voice",
  extensions: ["md"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "This property is how a persona describes herself rather than how an image of that persona was made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A portrait that already describes a persona does not take the place of this property.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two personas may look alike in their pictures.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two personas may never sound alike in their words.",
    },
    {
      decisionKind: "decision-kind/upkeep",
      statement: "An appearance names the ancestry the persona's anchor image shows.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
