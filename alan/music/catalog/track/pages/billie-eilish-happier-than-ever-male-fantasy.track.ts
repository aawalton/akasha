import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverMaleFantasy = {
  id: "01a0b638-e5da-7d87-87f9-ddae8a9fffaf",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-male-fantasy",
  ownLength: 3.2481,
  ownProgress: 3.2481,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  status: "completed",
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
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "malefantasy|6qqNVTkY8uBg9cP3Jd7DAH|194886",
  song: "song/billie-eilish-male-fantasy",
  carriedBy: [
    {
      release: "release/billie-eilish-happier-than-ever",
      discNumber: 1,
      position: 16,
      externalId: "4ak9GGe6afmi2HbxEjvhIC",
      externalLink: "https://open.spotify.com/track/4ak9GGe6afmi2HbxEjvhIC",
    },
  ],
} as const satisfies Track
