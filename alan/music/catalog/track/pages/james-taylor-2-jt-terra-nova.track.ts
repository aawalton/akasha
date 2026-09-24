import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JtTerraNova = {
  id: "01a0abeb-46e1-79a6-a9cf-0803ee93ff35",
  type: "page-type/track",
  slug: "james-taylor-2-jt-terra-nova",
  ownLength: 4.540016666666666,
  ownProgress: 4.540016666666666,
  partOfCollections: ["release/james-taylor-2-jt"],
  status: "completed",
  unit: "unit/minutes",
  title: "Terra Nova",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "terranova|0vn7UBvSQECKJm2817Yf1P|272401",
  song: "song/james-taylor-terra-nova",
  carriedBy: [
    {
      release: "release/james-taylor-2-jt",
      discNumber: 1,
      position: 10,
      externalId: "6vZBA5RNdiNWC92Zuo59y9",
      externalLink: "https://open.spotify.com/track/6vZBA5RNdiNWC92Zuo59y9",
    },
  ],
} as const satisfies Track
