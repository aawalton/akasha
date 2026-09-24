import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsEvolveNextToMe = {
  id: "01a0c43f-c9d2-7cf7-bf86-c5933462b617",
  type: "page-type/track",
  slug: "imagine-dragons-evolve-next-to-me",
  ownLength: 3.8381333333333334,
  ownProgress: 3.8381333333333334,
  partOfCollections: ["release/imagine-dragons-evolve"],
  status: "completed",
  unit: "unit/minutes",
  title: "Next To Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "nexttome|53XhwfbYqKCa1cC15pYq2q|230288",
  song: "song/imagine-dragons-next-to-me",
  carriedBy: [
    {
      release: "release/imagine-dragons-evolve",
      discNumber: 1,
      position: 1,
      externalId: "31VOknKjFrEX47bZXzqcoF",
      externalLink: "https://open.spotify.com/track/31VOknKjFrEX47bZXzqcoF",
    },
  ],
} as const satisfies Track
