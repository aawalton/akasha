import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2SongsFromTheHeart = {
  id: "01a0676a-d729-7065-af7f-f4324801ce34",
  type: "page-type/release",
  slug: "celtic-woman-2-songs-from-the-heart",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2009-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4isoRF5dFRCIE9kX6LVOfb",
      externalLink: "https://open.spotify.com/album/4isoRF5dFRCIE9kX6LVOfb",
    },
  ],
  title: "Songs From The Heart",
} as const satisfies Release
