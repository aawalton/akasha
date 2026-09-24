import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsOriginsDeluxeMachine = {
  id: "01a0c43f-c7b0-704d-b58d-d6c76f27ea46",
  type: "page-type/track",
  slug: "imagine-dragons-origins-deluxe-machine",
  ownLength: 3.0313333333333334,
  ownProgress: 3.0313333333333334,
  partOfCollections: ["release/imagine-dragons-origins-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Machine",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "machine|53XhwfbYqKCa1cC15pYq2q|181880",
  song: "song/imagine-dragons-machine",
  carriedBy: [
    {
      release: "release/imagine-dragons-origins-deluxe",
      discNumber: 1,
      position: 3,
      externalId: "4uGY9CqDtGtaTTLg1cgsWD",
      externalLink: "https://open.spotify.com/track/4uGY9CqDtGtaTTLg1cgsWD",
    },
  ],
} as const satisfies Track
