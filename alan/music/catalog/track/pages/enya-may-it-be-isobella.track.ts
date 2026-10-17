import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaMayItBeIsobella = {
  id: "01a14a1d-db4e-788b-a1e6-582f1a572009",
  type: "page-type/track",
  slug: "enya-may-it-be-isobella",
  ownLength: 4.454,
  ownProgress: 0,
  partOfCollections: ["release/enya-may-it-be"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Isobella",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "isobella|6uothxMWeLWIhsGeF7cyo4|267240",
  song: "song/enya-isobella",
  carriedBy: [
    {
      release: "release/enya-may-it-be",
      discNumber: 1,
      position: 2,
      externalId: "6UKRu6MneG09nG4dMtbelR",
      externalLink: "https://open.spotify.com/track/6UKRu6MneG09nG4dMtbelR",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T13:47:13.085Z",
} as const satisfies Track
