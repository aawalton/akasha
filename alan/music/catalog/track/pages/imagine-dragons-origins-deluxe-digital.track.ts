import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsOriginsDeluxeDigital = {
  id: "01a0c43f-c8ae-7aaa-8e3f-c8cb6679c521",
  type: "page-type/track",
  slug: "imagine-dragons-origins-deluxe-digital",
  ownLength: 3.3506666666666667,
  ownProgress: 3.3506666666666667,
  partOfCollections: ["release/imagine-dragons-origins-deluxe"],
  position: 9,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4qhDA6s0MkD5XpDqGLHIEY",
      externalLink: "https://open.spotify.com/track/4qhDA6s0MkD5XpDqGLHIEY",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Digital",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
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
