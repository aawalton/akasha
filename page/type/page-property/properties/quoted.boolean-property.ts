import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const quoted = {
  id: "01a0a582-6d43-7000-85c8-30cfde1eba32",
  type: "page-type/boolean-property",
  slug: "quoted",
  propertySlug: "quoted",
  definition: "whether a property holds words kept as they were said",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A property saying nothing here holds text a mechanical change respells a path in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property saying true here holds text no mechanical change rewrites.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path inside such text is left as it was said, even where that path has moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property whose words sit in a file of their own is read here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Words held inside a page's own file are respelled all the same.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
