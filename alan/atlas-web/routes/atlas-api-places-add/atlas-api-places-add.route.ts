import type { Route } from "@akasha/code/route"

export const atlasApiPlacesAdd = {
  id: "01a0883b-b4dd-7183-8f6a-4afc210a6fc8",
  pageTypeSlug: "route",
  slug: "atlas-api-places-add",
  definition: "the location page a reader keeps a found place as",
  code: "ts",
  urlPath: "api/places/add",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A file page is refused where the page names no path to sit at.",
    },
    {
      invariantKind: "departure",
      statement: "A place whose name yields no slug is refused.",
    },
  ],
} as const satisfies Route
