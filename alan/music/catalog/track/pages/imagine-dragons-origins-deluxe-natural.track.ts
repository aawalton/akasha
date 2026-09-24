import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsOriginsDeluxeNatural = {
  id: "01a0c43f-c767-70fb-b160-0c63dcbd5bb0",
  type: "page-type/track",
  slug: "imagine-dragons-origins-deluxe-natural",
  ownLength: 3.157766666666667,
  ownProgress: 3.157766666666667,
  partOfCollections: ["release/imagine-dragons-origins-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Natural",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "natural|53XhwfbYqKCa1cC15pYq2q|189466",
  song: "song/imagine-dragons-natural",
  carriedBy: [
    {
      release: "release/imagine-dragons-origins-deluxe",
      discNumber: 1,
      position: 1,
      externalId: "2FY7b99s15jUprqC0M5NCT",
      externalLink: "https://open.spotify.com/track/2FY7b99s15jUprqC0M5NCT",
    },
  ],
} as const satisfies Track
