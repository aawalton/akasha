import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaCloudsMarchOfTheCelts = {
  id: "01a14a1d-db4b-7062-ae36-4104196c3cc2",
  type: "page-type/track",
  slug: "enya-clouds-march-of-the-celts",
  ownLength: 3.25955,
  ownProgress: 0,
  partOfCollections: ["release/enya-clouds"],
  status: "not-started",
  unit: "unit/minutes",
  title: "March of the Celts",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "marchofthecelts|6uothxMWeLWIhsGeF7cyo4|195573",
  song: "song/enya-march-of-the-celts",
  carriedBy: [
    {
      release: "release/enya-clouds",
      discNumber: 1,
      position: 5,
      externalId: "6rKp6vMEZunwf8EeSWqnz9",
      externalLink: "https://open.spotify.com/track/6rKp6vMEZunwf8EeSWqnz9",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T13:47:13.085Z",
} as const satisfies Track
