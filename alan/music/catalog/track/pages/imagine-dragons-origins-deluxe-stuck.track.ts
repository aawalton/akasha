import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsOriginsDeluxeStuck = {
  id: "01a0c43f-c8fe-7b11-9de9-edd4a5c8665b",
  type: "page-type/track",
  slug: "imagine-dragons-origins-deluxe-stuck",
  ownLength: 3.1808833333333335,
  ownProgress: 3.1808833333333335,
  partOfCollections: ["release/imagine-dragons-origins-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Stuck",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "stuck|53XhwfbYqKCa1cC15pYq2q|190853",
  song: "song/imagine-dragons-stuck",
  carriedBy: [
    {
      release: "release/imagine-dragons-origins-deluxe",
      discNumber: 1,
      position: 11,
      externalId: "5Z9SQPYU95S6M1vcbLsDt2",
      externalLink: "https://open.spotify.com/track/5Z9SQPYU95S6M1vcbLsDt2",
    },
  ],
} as const satisfies Track
