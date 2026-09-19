import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveDontLetMeBeLonelyTonight = {
  id: "01a0abeb-3e1c-7602-a067-10674f741817",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-dont-let-me-be-lonely-tonight",
  ownLength: 3.194,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6LvPaXUdrEidPYrz16WUjQ",
      externalLink: "https://open.spotify.com/track/6LvPaXUdrEidPYrz16WUjQ",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Don't Let Me Be Lonely Tonight",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "dontletmebelonelytonight|0vn7UBvSQECKJm2817Yf1P|191640",
  song: "song/james-taylor-dont-let-me-be-lonely-tonight",
} as const satisfies Track
