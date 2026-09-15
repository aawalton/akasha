import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiPropertyOption = {
  id: "01a08826-71e0-7bcf-9928-e420b5a8cf1f",
  type: "page-type/route",
  slug: "alan-web-api-property-option",
  definition: "the refusal an ask to add a select option is answered with",
  code: "ts",
  urlPath: "api/property-option",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A property definition's options are a key in that definition's own file.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No option asked for here is added.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No definition is read here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A caller is told the option cannot be added rather than told the property is missing.",
    },
  ],
} as const satisfies Route
