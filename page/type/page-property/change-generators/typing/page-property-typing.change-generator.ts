import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const pagePropertyTyping = {
  id: "01a0d4f3-8ed1-7ad4-a936-3638484e37b4",
  type: "page-type/change-generator",
  slug: "page-property-typing",
  definition: "the type each page property states, written beside that property",
  code: "ts",
  runsAfter: ["change-generator/value-minting"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A property the change adds is typed once its id is minted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page property stating a type file has that file written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The files are worked out again only where the change could turn a property.",
    },
  ],
} as const satisfies ChangeGenerator
