import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2LullabyBrahmsLullabye = {
  id: "01a0abea-7215-732d-88f7-6ac6b9328d19",
  type: "page-type/track",
  slug: "celtic-woman-2-lullaby-brahms-lullabye",
  ownLength: 2.312,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-lullaby"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3OoNjzwr7Ifo3drIAPlNYy",
      externalLink: "https://open.spotify.com/track/3OoNjzwr7Ifo3drIAPlNYy",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Brahm's Lullabye",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "34sL9HIOU50t8u0IQMZeze", artistName: "Chloe Agnew" }],
  trackKey: "brahmslullabye|34sL9HIOU50t8u0IQMZeze|138720",
  song: "song/celtic-woman-brahms-lullabye",
} as const satisfies Track
