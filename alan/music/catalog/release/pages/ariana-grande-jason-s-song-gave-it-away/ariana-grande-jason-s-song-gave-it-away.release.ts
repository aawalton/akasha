import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeJasonSSongGaveItAway = {
  id: "01a0676a-d722-7021-b9a9-aa168ed15610",
  type: "page-type/release",
  slug: "ariana-grande-jason-s-song-gave-it-away",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2016-09-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3UriCAbU5UjggYgpOQYCQI",
      externalLink: "https://open.spotify.com/album/3UriCAbU5UjggYgpOQYCQI",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Jason's Song (Gave It Away)",
} as const satisfies Release
