import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaDarkSkyIslandSanctaMaria = {
  id: "01a14a1d-db4d-76d8-8a0c-fc0bc6816fd9",
  type: "page-type/track",
  slug: "enya-dark-sky-island-sancta-maria",
  ownLength: 3.8606666666666665,
  ownProgress: 0,
  partOfCollections: ["release/enya-dark-sky-island", "release/enya-dark-sky-island-deluxe"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Sancta Maria",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "sanctamaria|6uothxMWeLWIhsGeF7cyo4|231640",
  song: "song/enya-sancta-maria",
  carriedBy: [
    {
      release: "release/enya-dark-sky-island",
      discNumber: 1,
      position: 8,
      externalId: "2Dr10eCjsJ7MVORP80yMAV",
      externalLink: "https://open.spotify.com/track/2Dr10eCjsJ7MVORP80yMAV",
    },
    {
      release: "release/enya-dark-sky-island-deluxe",
      discNumber: 1,
      position: 8,
      externalId: "3qeTXY77zj4yJq3sNpI5p5",
      externalLink: "https://open.spotify.com/track/3qeTXY77zj4yJq3sNpI5p5",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T13:47:13.085Z",
} as const satisfies Track
