import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const atlasBasemapNaEu = {
  id: "01a0883b-0035-7210-a6bc-ddb46f2840c5",
  pageTypeSlug: "route",
  type: "route",
  slug: "atlas-basemap-na-eu",
  definition: "the North America and Europe basemap tiles, served a range at a time",
  code: "ts",
  urlPath: "basemap/na-eu.pmtiles",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A request naming no byte range is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A range wider than the cap is refused rather than served.",
    },
  ],
} as const satisfies Route
