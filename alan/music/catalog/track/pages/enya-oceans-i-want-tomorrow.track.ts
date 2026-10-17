import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaOceansIWantTomorrow = {
  id: "01a14a1d-db4e-7562-9ac2-fcc7e6908276",
  type: "page-type/track",
  slug: "enya-oceans-i-want-tomorrow",
  ownLength: 4.033333333333333,
  ownProgress: 0,
  partOfCollections: ["release/enya-oceans"],
  status: "not-started",
  unit: "unit/minutes",
  title: "I Want Tomorrow",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "iwanttomorrow|6uothxMWeLWIhsGeF7cyo4|242000",
  song: "song/enya-i-want-tomorrow",
  carriedBy: [
    {
      release: "release/enya-oceans",
      discNumber: 1,
      position: 8,
      externalId: "6Cjg8joJG3KVjy2LAWYFbo",
      externalLink: "https://open.spotify.com/track/6Cjg8joJG3KVjy2LAWYFbo",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T13:47:13.085Z",
} as const satisfies Track
