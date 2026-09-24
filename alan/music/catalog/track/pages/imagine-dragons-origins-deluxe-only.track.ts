import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsOriginsDeluxeOnly = {
  id: "01a0c43f-c8d5-72b7-a798-dd36e37d6969",
  type: "page-type/track",
  slug: "imagine-dragons-origins-deluxe-only",
  ownLength: 3.0122166666666668,
  ownProgress: 3.0122166666666668,
  partOfCollections: ["release/imagine-dragons-origins-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Only",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "only|53XhwfbYqKCa1cC15pYq2q|180733",
  song: "song/imagine-dragons-only",
  carriedBy: [
    {
      release: "release/imagine-dragons-origins-deluxe",
      discNumber: 1,
      position: 10,
      externalId: "1uRBbjQ3uNFXCncWyNomHf",
      externalLink: "https://open.spotify.com/track/1uRBbjQ3uNFXCncWyNomHf",
    },
  ],
} as const satisfies Track
