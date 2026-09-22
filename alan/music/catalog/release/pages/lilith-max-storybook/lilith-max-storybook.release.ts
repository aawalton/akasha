import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lilithMaxStorybook = {
  id: "01a0676a-d72a-7027-aa78-adf1321f9b19",
  type: "page-type/release",
  slug: "lilith-max-storybook",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lilith-max"],
  position: 0,
  publishedAt: "2022-11-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3To2YTLFipG2F2TqHRau1r",
      externalLink: "https://open.spotify.com/album/3To2YTLFipG2F2TqHRau1r",
    },
  ],
  title: "Storybook",
} as const satisfies Release
