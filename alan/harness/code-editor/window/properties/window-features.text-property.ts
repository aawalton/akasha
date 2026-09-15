import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const windowFeatures = {
  id: "01a0a158-a6b7-7389-9d78-445ec2c88b62",
  type: "page-type/text-property",
  slug: "window-features",
  propertySlug: "features",
  definition: "the document holding what a window last observed of each of its features",
  maxLength: 20000,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One JSON document holds every feature the window has observed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A feature's name names the field that feature's last observation is held under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A feature invents the names of the counts that feature keeps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The document is read whole, and a reader parses it for itself.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No question reaches a field inside this document.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write replaces the whole document rather than adding to the document.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No author writes an observation here by hand.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
