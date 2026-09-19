import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverNda = {
  id: "01a0b638-e562-7608-a66d-21c67d913425",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-nda",
  ownLength: 3.2629333333333332,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "38GBNKZUhfBkk3oNlWzRYd",
      externalLink: "https://open.spotify.com/track/38GBNKZUhfBkk3oNlWzRYd",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "NDA",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "nda|6qqNVTkY8uBg9cP3Jd7DAH|195776",
  song: "song/billie-eilish-nda",
} as const satisfies Track
