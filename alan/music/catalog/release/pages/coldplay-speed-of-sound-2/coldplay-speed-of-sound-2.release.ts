import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplaySpeedOfSound2 = {
  id: "01a0676a-d729-707a-94c6-e607029fcb24",
  type: "release",
  slug: "coldplay-speed-of-sound-2",
  title: "Speed of Sound",
  partOfCollections: ["artist/coldplay"],
  position: 0,
  ownLength: 4.749967,
  ownProgress: 4.749967,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2005-05-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0tT0oYLzbDAyFfb0ilJCv4",
      externalLink: "https://open.spotify.com/album/0tT0oYLzbDAyFfb0ilJCv4",
    },
  ],
} as const satisfies Release
