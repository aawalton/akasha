import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3MusicBoxDancer = {
  id: "01a0676a-d725-701a-a301-6bf63d00ee4b",
  type: "page-type/release",
  slug: "the-piano-guys-3-music-box-dancer",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2022-12-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "50DlZwe2OzuPvCj0BcpiXC",
      externalLink: "https://open.spotify.com/album/50DlZwe2OzuPvCj0BcpiXC",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Music Box Dancer",
  createdAt: "2026-09-03T13:17:30.277Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
