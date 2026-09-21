import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsOriginsDeluxeRealLife = {
  id: "01a0c43f-c9a8-78df-9181-4556d965961b",
  type: "page-type/track",
  slug: "imagine-dragons-origins-deluxe-real-life",
  ownLength: 4.125766666666666,
  ownProgress: 4.125766666666666,
  partOfCollections: ["release/imagine-dragons-origins-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7JAzAyjbJFPznEFdqpa1Si",
      externalLink: "https://open.spotify.com/track/7JAzAyjbJFPznEFdqpa1Si",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Real Life",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "reallife|53XhwfbYqKCa1cC15pYq2q|247546",
  song: "song/imagine-dragons-real-life",
  carriedBy: [
    {
      release: "release/imagine-dragons-origins-deluxe",
      discNumber: 1,
      position: 15,
      externalId: "7JAzAyjbJFPznEFdqpa1Si",
      externalLink: "https://open.spotify.com/track/7JAzAyjbJFPznEFdqpa1Si",
    },
  ],
} as const satisfies Track
