import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsEvolveThunder = {
  id: "01a0c43f-cb4a-736a-860e-29da33939bee",
  type: "page-type/track",
  slug: "imagine-dragons-evolve-thunder",
  ownLength: 3.1191,
  ownProgress: 3.1191,
  partOfCollections: ["release/imagine-dragons-evolve"],
  status: "completed",
  unit: "unit/minutes",
  title: "Thunder",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "thunder|53XhwfbYqKCa1cC15pYq2q|187146",
  song: "song/imagine-dragons-thunder",
  carriedBy: [
    {
      release: "release/imagine-dragons-evolve",
      discNumber: 1,
      position: 10,
      externalId: "1zB4vmk8tFRmM9UULNzbLB",
      externalLink: "https://open.spotify.com/track/1zB4vmk8tFRmM9UULNzbLB",
    },
  ],
} as const satisfies Track
