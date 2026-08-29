import type { NamePlace } from "../name-place.page-type.ts"

export const routeParameter = {
  id: "01a04fd4-3d74-7647-b787-d329d989e09e",
  pageTypeSlug: "name-place",
  slug: "route-parameter",
  definition: "the name of a part of a route's path that is filled in",
  nameFormatSlug: "name-format/lower-camel-case",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A parameter is read in code rather than written in a path, so it takes the case code takes and not the case a segment takes.",
    },
    {
      invariantKind: "departure",
      statement:
        "A parameter is named for the value it carries, never for how that value is written.",
    },
  ],
} as const satisfies NamePlace
