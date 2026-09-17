import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPeacefulSummerNightsEveningPrayer = {
  id: "01a0afa1-c668-7956-8b64-b4c07144e658",
  type: "page-type/track",
  slug: "the-piano-guys-peaceful-summer-nights-evening-prayer",
  ownLength: 1.6443166666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-peaceful-summer-nights"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "21Pgx3og7p0qeYIQgbq0Kh",
      externalLink: "https://open.spotify.com/track/21Pgx3og7p0qeYIQgbq0Kh",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Evening Prayer",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "eveningprayer|0jW6R8CVyVohuUJVcuweDI|98659",
} as const satisfies Track
