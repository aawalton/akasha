import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const everyChange = {
  id: "01a11bfa-d015-7ea8-9f9f-a6fa8c5a30d4",
  type: "page-type/boolean-property",
  slug: "every-change",
  propertySlug: "every-change",
  definition: "whether a value is worked out again whenever its page's committed values change",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value worked out once is worked out only for a page being created.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value worked out again on every change is worked out for a page being created as well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's committed values are the values its own file states.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
