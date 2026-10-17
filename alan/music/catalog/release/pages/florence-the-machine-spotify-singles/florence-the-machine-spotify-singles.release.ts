import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const florenceTheMachineSpotifySingles = {
  id: "01a0676a-d729-7081-a7b5-cf783bad4665",
  type: "page-type/release",
  slug: "florence-the-machine-spotify-singles",
  title: "Spotify Singles",
  partOfCollections: ["artist/florence-the-machine"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-09-19",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6MfeMJhhtj6Aas0rDfkHcO",
      externalLink: "https://open.spotify.com/album/6MfeMJhhtj6Aas0rDfkHcO",
    },
  ],
  createdAt: "2026-09-03T13:17:30.281Z",
  updatedAt: "2026-10-17T14:01:01.286Z",
} as const satisfies Release
