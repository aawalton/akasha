import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishSixFeetUnderSixFeetUnder = {
  id: "01a0b638-eeae-7ad6-bdf5-1ebcd5979a84",
  type: "page-type/track",
  slug: "billie-eilish-six-feet-under-six-feet-under",
  ownLength: 3.1602166666666665,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-six-feet-under"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2VlLbhGLVJgdOW7kKdWWFc",
      externalLink: "https://open.spotify.com/track/2VlLbhGLVJgdOW7kKdWWFc",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Six Feet Under",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "sixfeetunder|6qqNVTkY8uBg9cP3Jd7DAH|189613",
  song: "song/billie-eilish-six-feet-under",
} as const satisfies Track
