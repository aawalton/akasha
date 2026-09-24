import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2CoversItsGrowing = {
  id: "01a0abeb-33b3-76c4-92bf-b6a9cd084f16",
  type: "page-type/track",
  slug: "james-taylor-2-covers-its-growing",
  ownLength: 4.13155,
  ownProgress: 4.13155,
  partOfCollections: ["release/james-taylor-2-covers"],
  status: "completed",
  unit: "unit/minutes",
  title: "It's Growing",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "itsgrowing|0vn7UBvSQECKJm2817Yf1P|247893",
  song: "song/james-taylor-its-growing",
  carriedBy: [
    {
      release: "release/james-taylor-2-covers",
      discNumber: 1,
      position: 1,
      externalId: "68Qf4tPdL93soTR5wpcDGN",
      externalLink: "https://open.spotify.com/track/68Qf4tPdL93soTR5wpcDGN",
    },
  ],
} as const satisfies Track
