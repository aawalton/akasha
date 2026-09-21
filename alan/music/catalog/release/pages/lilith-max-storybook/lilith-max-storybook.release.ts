import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lilithMaxStorybook = {
  id: "01a0676a-d72a-7027-aa78-adf1321f9b19",
  type: "page-type/release",
  slug: "lilith-max-storybook",
  title: "Storybook",
  partOfCollections: ["artist/lilith-max"],
  position: 0,
  ownLength: 16.166217,
  ownProgress: 16.166217,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2022-11-04",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3To2YTLFipG2F2TqHRau1r",
      externalLink: "https://open.spotify.com/album/3To2YTLFipG2F2TqHRau1r",
    },
  ],
} as const satisfies Release
