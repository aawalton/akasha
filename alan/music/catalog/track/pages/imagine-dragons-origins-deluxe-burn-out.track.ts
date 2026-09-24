import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsOriginsDeluxeBurnOut = {
  id: "01a0c43f-c97e-783e-9012-7452af00c606",
  type: "page-type/track",
  slug: "imagine-dragons-origins-deluxe-burn-out",
  ownLength: 4.564666666666667,
  ownProgress: 4.564666666666667,
  partOfCollections: ["release/imagine-dragons-origins-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Burn Out",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "burnout|53XhwfbYqKCa1cC15pYq2q|273880",
  song: "song/imagine-dragons-burn-out",
  carriedBy: [
    {
      release: "release/imagine-dragons-origins-deluxe",
      discNumber: 1,
      position: 14,
      externalId: "5Q7zuH8VNu7aLappSusPu6",
      externalLink: "https://open.spotify.com/track/5Q7zuH8VNu7aLappSusPu6",
    },
  ],
} as const satisfies Track
