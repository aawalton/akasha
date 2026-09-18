import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishBoredBored = {
  id: "01a0b638-ecf9-7b29-81de-324795003bf8",
  type: "page-type/track",
  slug: "billie-eilish-bored-bored",
  ownLength: 3.01555,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-bored"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "04sN26COy28wTXYj3dMoiZ",
      externalLink: "https://open.spotify.com/track/04sN26COy28wTXYj3dMoiZ",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Bored",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "bored|6qqNVTkY8uBg9cP3Jd7DAH|180933",
} as const satisfies Track
