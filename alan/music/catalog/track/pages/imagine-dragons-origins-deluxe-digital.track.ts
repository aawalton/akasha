import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsOriginsDeluxeDigital = {
  id: "01a0c43f-c8ae-7aaa-8e3f-c8cb6679c521",
  type: "page-type/track",
  slug: "imagine-dragons-origins-deluxe-digital",
  ownLength: 3.3506666666666667,
  ownProgress: 3.3506666666666667,
  partOfCollections: ["release/imagine-dragons-origins-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Digital",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "digital|53XhwfbYqKCa1cC15pYq2q|201040",
  song: "song/imagine-dragons-digital",
  carriedBy: [
    {
      release: "release/imagine-dragons-origins-deluxe",
      discNumber: 1,
      position: 9,
      externalId: "4qhDA6s0MkD5XpDqGLHIEY",
      externalLink: "https://open.spotify.com/track/4qhDA6s0MkD5XpDqGLHIEY",
    },
  ],
} as const satisfies Track
