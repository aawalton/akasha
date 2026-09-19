import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const trackType = {
  id: "01a0c1e4-3b7a-7f00-8c62-4d9e1a70b5c3",
  type: "page-type/select-property",
  slug: "track-type",
  propertySlug: "track-type",
  definition: "what kind of recording a track is",
  values: [
    "studio",
    "live",
    "remix",
    "acoustic",
    "instrumental",
    "a-cappella",
    "remaster",
    "demo",
    "version",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A track saying nothing of itself is the studio recording.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A recording no other value names and a title calls a version is a version.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says whose composition the track is a recording of.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
