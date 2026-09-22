import type { NamePlace } from "akasha/page/name-place/name-place.page-type.types.ts"

export const routeParameter = {
  id: "01a04fd4-3d74-7647-b787-d329d989e09e",
  type: "page-type/name-place",
  slug: "route-parameter",
  definition: "the name of a part of a route's path that a value fills",
  nameFormat: "name-format/lower-camel-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A parameter is read in code rather than written in a path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A parameter is named for the value that parameter has rather than for how that value is written.",
    },
  ],
} as const satisfies NamePlace
