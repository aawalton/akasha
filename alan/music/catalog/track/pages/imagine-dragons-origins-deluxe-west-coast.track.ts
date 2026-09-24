import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsOriginsDeluxeWestCoast = {
  id: "01a0c43f-c821-7d6c-b870-0f8e1aa338c1",
  type: "page-type/track",
  slug: "imagine-dragons-origins-deluxe-west-coast",
  ownLength: 3.61955,
  ownProgress: 3.61955,
  partOfCollections: ["release/imagine-dragons-origins-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "West Coast",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "westcoast|53XhwfbYqKCa1cC15pYq2q|217173",
  song: "song/imagine-dragons-west-coast",
  carriedBy: [
    {
      release: "release/imagine-dragons-origins-deluxe",
      discNumber: 1,
      position: 6,
      externalId: "2nkoWsTZa8LKPNGdjI5uxj",
      externalLink: "https://open.spotify.com/track/2nkoWsTZa8LKPNGdjI5uxj",
    },
  ],
} as const satisfies Track
