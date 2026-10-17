import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaStarsMarbleHalls = {
  id: "01a14a1d-db51-7504-a485-ad6a833372cf",
  type: "page-type/track",
  slug: "enya-stars-marble-halls",
  ownLength: 3.9033333333333333,
  ownProgress: 0,
  partOfCollections: ["release/enya-stars"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Marble Halls",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "marblehalls|6uothxMWeLWIhsGeF7cyo4|234200",
  song: "song/enya-marble-halls",
  carriedBy: [
    {
      release: "release/enya-stars",
      discNumber: 1,
      position: 12,
      externalId: "4dsgd2vYv7xCPbkRIxoFhC",
      externalLink: "https://open.spotify.com/track/4dsgd2vYv7xCPbkRIxoFhC",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T13:47:13.085Z",
} as const satisfies Track
