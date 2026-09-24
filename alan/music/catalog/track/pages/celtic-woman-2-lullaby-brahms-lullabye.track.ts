import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2LullabyBrahmsLullabye = {
  id: "01a0abea-7215-732d-88f7-6ac6b9328d19",
  type: "page-type/track",
  slug: "celtic-woman-2-lullaby-brahms-lullabye",
  ownLength: 2.312,
  ownProgress: 2.312,
  partOfCollections: ["release/celtic-woman-2-lullaby"],
  status: "completed",
  unit: "unit/minutes",
  title: "Brahm's Lullabye",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "Chloe Agnew" }],
  trackKey: "brahmslullabye|34sL9HIOU50t8u0IQMZeze|138720",
  song: "song/celtic-woman-brahms-lullabye",
  carriedBy: [
    {
      release: "release/celtic-woman-2-lullaby",
      discNumber: 1,
      position: 9,
      externalId: "3OoNjzwr7Ifo3drIAPlNYy",
      externalLink: "https://open.spotify.com/track/3OoNjzwr7Ifo3drIAPlNYy",
    },
  ],
} as const satisfies Track
