import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishWhenWeAllFallAsleepWhereDoWeGoMyStrangeAddiction = {
  id: "01a0b638-e73d-75ca-ad41-2477117c71c6",
  type: "page-type/track",
  slug: "billie-eilish-when-we-all-fall-asleep-where-do-we-go-my-strange-addiction",
  ownLength: 2.99815,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-when-we-all-fall-asleep-where-do-we-go"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Tc57t9l2O8FwQZtQOvPXK",
      externalLink: "https://open.spotify.com/track/3Tc57t9l2O8FwQZtQOvPXK",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "my strange addiction",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "mystrangeaddiction|6qqNVTkY8uBg9cP3Jd7DAH|179889",
  song: "song/billie-eilish-my-strange-addiction",
} as const satisfies Track
