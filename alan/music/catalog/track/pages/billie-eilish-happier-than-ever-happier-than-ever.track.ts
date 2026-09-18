import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverHappierThanEver = {
  id: "01a0b638-e5b0-764b-b6da-a23d6b2be6fa",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-happier-than-ever",
  ownLength: 4.98165,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4RVwu0g32PAqgUiJoXsdF8",
      externalLink: "https://open.spotify.com/track/4RVwu0g32PAqgUiJoXsdF8",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Happier Than Ever",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "happierthanever|6qqNVTkY8uBg9cP3Jd7DAH|298899",
} as const satisfies Track
