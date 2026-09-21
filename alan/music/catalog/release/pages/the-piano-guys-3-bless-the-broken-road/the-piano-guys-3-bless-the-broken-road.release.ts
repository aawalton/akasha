import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3BlessTheBrokenRoad = {
  id: "01a0676a-d719-7015-9ea7-cd93c161b671",
  type: "page-type/release",
  slug: "the-piano-guys-3-bless-the-broken-road",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2020-04-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0lAKUFlibEe6yMQmhvMF09",
      externalLink: "https://open.spotify.com/album/0lAKUFlibEe6yMQmhvMF09",
    },
  ],
  title: "Bless the Broken Road",
} as const satisfies Release
