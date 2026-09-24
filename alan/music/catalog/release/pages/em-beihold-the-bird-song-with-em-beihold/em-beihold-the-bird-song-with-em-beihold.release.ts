import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emBeiholdTheBirdSongWithEmBeihold = {
  id: "01a0676a-d72c-7032-a15f-60dfcfdd73d4",
  type: "page-type/release",
  slug: "em-beihold-the-bird-song-with-em-beihold",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/em-beihold"],
  position: 0,
  publishedAt: "2024-12-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "16aOYP4x2wHzjOZBUSvvg5",
      externalLink: "https://open.spotify.com/album/16aOYP4x2wHzjOZBUSvvg5",
    },
  ],
  title: "The Bird Song (with Em Beihold)",
} as const satisfies Release
