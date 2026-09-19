import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyTenthAnniversaryEditionPopularSongMikaArianaGrande = {
  id: "01a0a6c5-1dae-7505-b087-6c299c532684",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-tenth-anniversary-edition-popular-song-mika-ariana-grande",
  ownLength: 3.3366833333333332,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yours-truly-tenth-anniversary-edition"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4AzzUUIBICXrr5OYfs2u2C",
      externalLink: "https://open.spotify.com/track/4AzzUUIBICXrr5OYfs2u2C",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Popular Song (MIKA & Ariana Grande)",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "5MmVJVhhYKQ86izuGHzJYA", artistName: "MIKA" },
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
  ],
  trackKey: "popularsongmikaarianagrande|5MmVJVhhYKQ86izuGHzJYA,66CXWjxzNUsdJxJ2JdwvnR|200201",
  song: "song/ariana-grande-popular-song-mika-ariana-grande",
} as const satisfies Track
