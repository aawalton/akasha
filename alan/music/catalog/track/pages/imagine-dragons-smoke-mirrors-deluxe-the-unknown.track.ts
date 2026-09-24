import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsSmokeMirrorsDeluxeTheUnknown = {
  id: "01a0c43f-d11e-7188-ad25-468d4ef97597",
  type: "page-type/track",
  slug: "imagine-dragons-smoke-mirrors-deluxe-the-unknown",
  ownLength: 3.412,
  ownProgress: 3.412,
  partOfCollections: ["release/imagine-dragons-smoke-mirrors-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Unknown",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "theunknown|53XhwfbYqKCa1cC15pYq2q|204720",
  song: "song/imagine-dragons-the-unknown",
  carriedBy: [
    {
      release: "release/imagine-dragons-smoke-mirrors-deluxe",
      discNumber: 1,
      position: 15,
      externalId: "4DRQBzgiM3SQqO5bXXPGpb",
      externalLink: "https://open.spotify.com/track/4DRQBzgiM3SQqO5bXXPGpb",
    },
  ],
} as const satisfies Track
