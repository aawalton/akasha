import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsOriginsDeluxeCoolOut = {
  id: "01a0c43f-c7d6-7513-a713-138572c9453a",
  type: "page-type/track",
  slug: "imagine-dragons-origins-deluxe-cool-out",
  ownLength: 3.6311,
  ownProgress: 3.6311,
  partOfCollections: ["release/imagine-dragons-origins-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Cool Out",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "coolout|53XhwfbYqKCa1cC15pYq2q|217866",
  song: "song/imagine-dragons-cool-out",
  carriedBy: [
    {
      release: "release/imagine-dragons-origins-deluxe",
      discNumber: 1,
      position: 4,
      externalId: "6LXMUR2rpxFBDo6nilS3yX",
      externalLink: "https://open.spotify.com/track/6LXMUR2rpxFBDo6nilS3yX",
    },
  ],
} as const satisfies Track
