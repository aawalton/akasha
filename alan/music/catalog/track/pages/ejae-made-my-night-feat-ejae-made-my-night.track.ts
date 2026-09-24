import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const ejaeMadeMyNightFeatEjaeMadeMyNight = {
  id: "01a0d3ab-21eb-7977-bfdd-23305bbb071f",
  type: "page-type/track",
  slug: "ejae-made-my-night-feat-ejae-made-my-night",
  ownLength: 2.1,
  ownProgress: 0,
  partOfCollections: ["release/ejae-made-my-night-feat-ejae"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Made My Night",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "4SpbR6yFEvexJuaBpgAU5p", artistName: "LE SSERAFIM" }],
  trackKey: "mademynight|4SpbR6yFEvexJuaBpgAU5p|126000",
  song: "song/ejae-made-my-night",
  carriedBy: [
    {
      release: "release/ejae-made-my-night-feat-ejae",
      discNumber: 1,
      position: 2,
      externalId: "00MWSPgbYiFSxdxf9rhm2T",
      externalLink: "https://open.spotify.com/track/00MWSPgbYiFSxdxf9rhm2T",
    },
  ],
} as const satisfies Track
