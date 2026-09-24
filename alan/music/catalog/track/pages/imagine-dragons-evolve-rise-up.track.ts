import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsEvolveRiseUp = {
  id: "01a0c43f-caa7-7028-9e44-5523020824c4",
  type: "page-type/track",
  slug: "imagine-dragons-evolve-rise-up",
  ownLength: 3.862,
  ownProgress: 3.862,
  partOfCollections: ["release/imagine-dragons-evolve"],
  status: "completed",
  unit: "unit/minutes",
  title: "Rise Up",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "riseup|53XhwfbYqKCa1cC15pYq2q|231720",
  song: "song/imagine-dragons-rise-up",
  carriedBy: [
    {
      release: "release/imagine-dragons-evolve",
      discNumber: 1,
      position: 6,
      externalId: "3zT2616WcD9Df5m21OsCX0",
      externalLink: "https://open.spotify.com/track/3zT2616WcD9Df5m21OsCX0",
    },
  ],
} as const satisfies Track
