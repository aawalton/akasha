import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2ThatSWhyIMHereMona = {
  id: "01a0abeb-42ce-7026-a9c9-1f29c1676489",
  type: "page-type/track",
  slug: "james-taylor-2-that-s-why-i-m-here-mona",
  ownLength: 2.81555,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-that-s-why-i-m-here"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2SQuqDBmNjSB22dFqjkSOP",
      externalLink: "https://open.spotify.com/track/2SQuqDBmNjSB22dFqjkSOP",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Mona",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "mona|0vn7UBvSQECKJm2817Yf1P|168933",
} as const satisfies Track
