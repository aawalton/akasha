import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsOriginsDeluxeBirds = {
  id: "01a0c43f-c953-733a-be5e-e10290efe4a1",
  type: "page-type/track",
  slug: "imagine-dragons-origins-deluxe-birds",
  ownLength: 3.6573333333333333,
  ownProgress: 3.6573333333333333,
  partOfCollections: ["release/imagine-dragons-origins-deluxe"],
  position: 13,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Tvzf3VEi16JMhAgOwdt2y",
      externalLink: "https://open.spotify.com/track/6Tvzf3VEi16JMhAgOwdt2y",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Birds",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "birds|53XhwfbYqKCa1cC15pYq2q|219440",
  song: "song/imagine-dragons-birds",
  carriedBy: [
    {
      release: "release/imagine-dragons-origins-deluxe",
      discNumber: 1,
      position: 13,
      externalId: "6Tvzf3VEi16JMhAgOwdt2y",
      externalLink: "https://open.spotify.com/track/6Tvzf3VEi16JMhAgOwdt2y",
    },
  ],
} as const satisfies Track
