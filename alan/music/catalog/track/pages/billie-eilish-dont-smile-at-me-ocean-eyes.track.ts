import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishDontSmileAtMeOceanEyes = {
  id: "01a0b638-ec2e-7af1-8bd1-67cbf5c67a7d",
  type: "page-type/track",
  slug: "billie-eilish-dont-smile-at-me-ocean-eyes",
  ownLength: 3.33965,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-dont-smile-at-me"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7hDVYcQq6MxkdJGweuCtl9",
      externalLink: "https://open.spotify.com/track/7hDVYcQq6MxkdJGweuCtl9",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "ocean eyes",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "oceaneyes|6qqNVTkY8uBg9cP3Jd7DAH|200379",
} as const satisfies Track
