import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverEditHappierThanEverEdit = {
  id: "01a0b638-e929-7438-ba9f-97f599bd94f0",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-edit-happier-than-ever-edit",
  ownLength: 2.5240666666666667,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-happier-than-ever-edit"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "32BeYxKPrig1LefHsC0Xuo",
      externalLink: "https://open.spotify.com/track/32BeYxKPrig1LefHsC0Xuo",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Happier Than Ever - Edit",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "happierthaneveredit|6qqNVTkY8uBg9cP3Jd7DAH|151444",
  song: "song/billie-eilish-happier-than-ever",
} as const satisfies Track
