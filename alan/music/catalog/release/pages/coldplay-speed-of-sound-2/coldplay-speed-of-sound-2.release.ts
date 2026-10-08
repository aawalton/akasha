import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplaySpeedOfSound2 = {
  id: "01a0676a-d729-707a-94c6-e607029fcb24",
  type: "page-type/release",
  slug: "coldplay-speed-of-sound-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2005-05-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0tT0oYLzbDAyFfb0ilJCv4",
      externalLink: "https://open.spotify.com/album/0tT0oYLzbDAyFfb0ilJCv4",
    },
  ],
  title: "Speed of Sound",
  createdAt: "2026-09-03T13:17:30.281Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
