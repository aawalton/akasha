import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsSmokeMirrorsDeluxeTheFall = {
  id: "01a0c43f-d0ce-7f4b-b0fa-b0d59be37243",
  type: "page-type/track",
  slug: "imagine-dragons-smoke-mirrors-deluxe-the-fall",
  ownLength: 6.0411,
  ownProgress: 6.0411,
  partOfCollections: ["release/imagine-dragons-smoke-mirrors-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Fall",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "thefall|53XhwfbYqKCa1cC15pYq2q|362466",
  song: "song/imagine-dragons-the-fall",
  carriedBy: [
    {
      release: "release/imagine-dragons-smoke-mirrors-deluxe",
      discNumber: 1,
      position: 13,
      externalId: "4Nwanvqzx02WpDxtYHS0lT",
      externalLink: "https://open.spotify.com/track/4Nwanvqzx02WpDxtYHS0lT",
    },
  ],
} as const satisfies Track
