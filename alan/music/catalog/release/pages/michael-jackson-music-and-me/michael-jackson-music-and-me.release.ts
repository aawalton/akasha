import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const michaelJacksonMusicAndMe = {
  id: "01a0676a-d725-7019-822f-1971d310dfe3",
  type: "page-type/release",
  slug: "michael-jackson-music-and-me",
  title: "Music and Me",
  partOfCollections: ["artist/michael-jackson"],
  position: 0,
  ownLength: 32.238617,
  ownProgress: 32.238617,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "1973-08-13",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "19vhLDr0Fw8Lja1I8xVV09",
      externalLink: "https://open.spotify.com/album/19vhLDr0Fw8Lja1I8xVV09",
      lastSyncedAt: "2025-10-04",
    },
  ],
  createdAt: "2026-09-03T13:17:30.277Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
