import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishDontSmileAtMeCopycat = {
  id: "01a0b638-eb46-718c-806f-df4670d0ce83",
  type: "page-type/track",
  slug: "billie-eilish-dont-smile-at-me-copycat",
  ownLength: 3.2451833333333333,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-dont-smile-at-me"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5w7wuzMzsDer96KqxafeRK",
      externalLink: "https://open.spotify.com/track/5w7wuzMzsDer96KqxafeRK",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "COPYCAT",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "copycat|6qqNVTkY8uBg9cP3Jd7DAH|194711",
  song: "song/billie-eilish-copycat",
} as const satisfies Track
