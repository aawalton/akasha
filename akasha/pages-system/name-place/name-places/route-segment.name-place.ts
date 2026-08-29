import type { NamePlace } from "../name-place.page-type.ts"

export const routeSegment = {
  id: "01a04fd4-3d73-79db-a3a7-e6f88084420c",
  pageTypeSlug: "name-place",
  slug: "route-segment",
  definition: "a standing part of a route's path",
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A segment is a word in a path, so it is written as a slug is written.",
    },
    {
      invariantKind: "departure",
      statement:
        "A segment naming a file the route serves carries that file's extension, and the part before the dot is the name.",
    },
  ],
} as const satisfies NamePlace
