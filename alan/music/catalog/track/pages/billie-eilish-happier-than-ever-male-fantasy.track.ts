import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverMaleFantasy = {
  id: "01a0b638-e5da-7d87-87f9-ddae8a9fffaf",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-male-fantasy",
  ownLength: 3.2481,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4ak9GGe6afmi2HbxEjvhIC",
      externalLink: "https://open.spotify.com/track/4ak9GGe6afmi2HbxEjvhIC",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Male Fantasy",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "malefantasy|6qqNVTkY8uBg9cP3Jd7DAH|194886",
} as const satisfies Track
