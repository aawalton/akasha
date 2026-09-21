import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsOriginsDeluxeBulletInAGun = {
  id: "01a0c43f-c88a-755e-9fb5-198ba5fe168d",
  type: "page-type/track",
  slug: "imagine-dragons-origins-deluxe-bullet-in-a-gun",
  ownLength: 3.4142166666666665,
  ownProgress: 3.4142166666666665,
  partOfCollections: ["release/imagine-dragons-origins-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3R4Xk37WTagjzODMNEQLvs",
      externalLink: "https://open.spotify.com/track/3R4Xk37WTagjzODMNEQLvs",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Bullet In A Gun",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "bulletinagun|53XhwfbYqKCa1cC15pYq2q|204853",
  song: "song/imagine-dragons-bullet-in-a-gun",
  carriedBy: [
    {
      release: "release/imagine-dragons-origins-deluxe",
      discNumber: 1,
      position: 8,
      externalId: "3R4Xk37WTagjzODMNEQLvs",
      externalLink: "https://open.spotify.com/track/3R4Xk37WTagjzODMNEQLvs",
    },
  ],
} as const satisfies Track
