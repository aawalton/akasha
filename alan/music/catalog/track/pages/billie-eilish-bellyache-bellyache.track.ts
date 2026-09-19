import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishBellyacheBellyache = {
  id: "01a0b638-ed22-77a9-88a5-4d91bcf1f7da",
  type: "page-type/track",
  slug: "billie-eilish-bellyache-bellyache",
  ownLength: 2.9862,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-bellyache"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "51NFxnQvaosfDDutk0tams",
      externalLink: "https://open.spotify.com/track/51NFxnQvaosfDDutk0tams",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "bellyache",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "bellyache|6qqNVTkY8uBg9cP3Jd7DAH|179172",
  song: "song/billie-eilish-bellyache",
} as const satisfies Track
