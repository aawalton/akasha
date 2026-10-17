import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaDarkSkyIslandAstraEtLuna = {
  id: "01a14a1d-db4c-7e2c-b562-b2c7b44cc6e1",
  type: "page-type/track",
  slug: "enya-dark-sky-island-astra-et-luna",
  ownLength: 3.35155,
  ownProgress: 0,
  partOfCollections: ["release/enya-dark-sky-island", "release/enya-dark-sky-island-deluxe"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Astra et Luna",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "astraetluna|6uothxMWeLWIhsGeF7cyo4|201093",
  song: "song/enya-astra-et-luna",
  carriedBy: [
    {
      release: "release/enya-dark-sky-island",
      discNumber: 1,
      position: 9,
      externalId: "4Rk3ynSRkB2vJUgyC6er0S",
      externalLink: "https://open.spotify.com/track/4Rk3ynSRkB2vJUgyC6er0S",
    },
    {
      release: "release/enya-dark-sky-island-deluxe",
      discNumber: 1,
      position: 9,
      externalId: "3f3sm0q0yZ138Kaeel3EMl",
      externalLink: "https://open.spotify.com/track/3f3sm0q0yZ138Kaeel3EMl",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T13:47:13.085Z",
} as const satisfies Track
