import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverGoldwing = {
  id: "01a0b638-e45b-78cf-98fa-a84a5130aaba",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-goldwing",
  ownLength: 2.5256,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0FfqyjhB6Kspvit1oOo7ax",
      externalLink: "https://open.spotify.com/track/0FfqyjhB6Kspvit1oOo7ax",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "GOLDWING",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "goldwing|6qqNVTkY8uBg9cP3Jd7DAH|151536",
} as const satisfies Track
