import type { SelectProperty } from "@akasha/pages-system/select-property"

export const episodeType = {
  id: "01a06599-ee09-700b-b9c1-3c28e65e2b56",
  pageTypeSlug: "select-property",
  slug: "episode-type",
  propertySlug: "episode-type",
  definition: "what an episode is to the run it sits in",
  values: ["standard", "mid-season", "finale"],
  invariants: [
    {
      invariantKind: "gap",
      statement:
        "The values are the ones the record holds rather than all the provider answers with.",
    },
  ],
} as const satisfies SelectProperty

export type EpisodeType = (typeof episodeType.values)[number]
