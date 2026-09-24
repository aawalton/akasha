import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraTheGodsWeCanTouchArtemis = {
  id: "01a0b637-f58b-73a0-bef5-51a5fd78fdc5",
  type: "page-type/track",
  slug: "aurora-the-gods-we-can-touch-artemis",
  ownLength: 2.641766666666667,
  ownProgress: 2.641766666666667,
  partOfCollections: ["release/aurora-the-gods-we-can-touch"],
  status: "completed",
  unit: "unit/minutes",
  title: "Artemis",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "artemis|1WgXqy2Dd70QQOU7Ay074N|158506",
  song: "song/aurora-artemis",
  carriedBy: [
    {
      release: "release/aurora-the-gods-we-can-touch",
      discNumber: 1,
      position: 12,
      externalId: "0AugTLXmK63udaMMrDmgdy",
      externalLink: "https://open.spotify.com/track/0AugTLXmK63udaMMrDmgdy",
    },
  ],
} as const satisfies Track
