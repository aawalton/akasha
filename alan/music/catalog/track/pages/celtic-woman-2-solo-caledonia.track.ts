import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2SoloCaledonia = {
  id: "01a0abea-6aed-7a9d-8bd8-0b7af8e3a339",
  type: "page-type/track",
  slug: "celtic-woman-2-solo-caledonia",
  ownLength: 4.967133333333333,
  ownProgress: 4.967133333333333,
  partOfCollections: ["release/celtic-woman-2-solo"],
  status: "completed",
  unit: "unit/minutes",
  title: "Caledonia",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "Susan" }],
  trackKey: "caledonia|1qvS1CTPZHz1KyE2jx92pQ|298028",
  song: "song/celtic-woman-caledonia",
  carriedBy: [
    {
      release: "release/celtic-woman-2-solo",
      discNumber: 1,
      position: 7,
      externalId: "3VN1kN5fncIRWeMNonl0sr",
      externalLink: "https://open.spotify.com/track/3VN1kN5fncIRWeMNonl0sr",
    },
  ],
} as const satisfies Track
