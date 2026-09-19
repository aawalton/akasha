import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishWhenWeAllFallAsleepWhereDoWeGoIlomilo = {
  id: "01a0b638-e792-71e1-9bb9-4894ff3c1b57",
  type: "page-type/track",
  slug: "billie-eilish-when-we-all-fall-asleep-where-do-we-go-ilomilo",
  ownLength: 2.6061666666666667,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-when-we-all-fall-asleep-where-do-we-go"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7qEKqBCD2vE5vIBsrUitpD",
      externalLink: "https://open.spotify.com/track/7qEKqBCD2vE5vIBsrUitpD",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "ilomilo",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "ilomilo|6qqNVTkY8uBg9cP3Jd7DAH|156370",
  song: "song/billie-eilish-ilomilo",
} as const satisfies Track
