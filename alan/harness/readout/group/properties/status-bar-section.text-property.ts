import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const statusBarSection = {
  id: "01a0d984-bf95-7306-97e3-c542f45ddc50",
  type: "page-type/text-property",
  slug: "status-bar-section",
  propertySlug: "status-bar-section",
  definition: "the section of the editor's status bar a group is drawn in",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A group stating no section is drawn in no section.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two groups stating one section are drawn in it in the order of their slugs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A section is spelled as the status bar's state names it.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
