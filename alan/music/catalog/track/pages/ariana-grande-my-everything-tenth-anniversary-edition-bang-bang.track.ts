import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingTenthAnniversaryEditionBangBang = {
  id: "01a0a6c5-17c2-7e24-9384-ba513c98806b",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-tenth-anniversary-edition-bang-bang",
  ownLength: 3.32295,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-my-everything-tenth-anniversary-edition"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "742RnSnVo7SZNhN32AavQJ",
      externalLink: "https://open.spotify.com/track/742RnSnVo7SZNhN32AavQJ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Bang Bang",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "2gsggkzM5R49q6jpPvazou", artistName: "Jessie J" },
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "0hCNtLu0JehylgoiP8L4Gh", artistName: "Nicki Minaj" },
  ],
  trackKey: "bangbang|0hCNtLu0JehylgoiP8L4Gh,2gsggkzM5R49q6jpPvazou,66CXWjxzNUsdJxJ2JdwvnR|199377",
  song: "song/ariana-grande-bang-bang",
} as const satisfies Track
