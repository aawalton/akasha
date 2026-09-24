import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const takesAtMost = {
  id: "01a091db-ef1e-7d59-82ae-b2fbcb028c53",
  type: "page-type/boolean-property",
  slug: "takes-at-most",
  propertySlug: "takes-at-most",
  definition: "whether a change takes a ceiling on a run's page count",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A change saying nothing here acts on every page that change reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change saying true takes that ceiling under `at-most`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run handed no ceiling acts on every page the change reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A change saying true answers no edit rather than a refusal where nothing is left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal from such a change means a run was blocked rather than done.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
