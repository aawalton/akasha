import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverNotMyResponsibility = {
  id: "01a0b638-e4c4-766f-b913-65c8053e6922",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-not-my-responsibility",
  ownLength: 3.79465,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4T2zre0jqstNJ5Gt0WG9lz",
      externalLink: "https://open.spotify.com/track/4T2zre0jqstNJ5Gt0WG9lz",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Not My Responsibility",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "notmyresponsibility|6qqNVTkY8uBg9cP3Jd7DAH|227679",
  song: "song/billie-eilish-not-my-responsibility",
} as const satisfies Track
