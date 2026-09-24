import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsOriginsDeluxeBoomerang = {
  id: "01a0c43f-c78b-70d6-9a0e-e481fbe94665",
  type: "page-type/track",
  slug: "imagine-dragons-origins-deluxe-boomerang",
  ownLength: 3.13,
  ownProgress: 3.13,
  partOfCollections: ["release/imagine-dragons-origins-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Boomerang",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "boomerang|53XhwfbYqKCa1cC15pYq2q|187800",
  song: "song/imagine-dragons-boomerang",
  carriedBy: [
    {
      release: "release/imagine-dragons-origins-deluxe",
      discNumber: 1,
      position: 2,
      externalId: "2B1fuWoWaYnCXbjYp1gXg5",
      externalLink: "https://open.spotify.com/track/2B1fuWoWaYnCXbjYp1gXg5",
    },
  ],
} as const satisfies Track
