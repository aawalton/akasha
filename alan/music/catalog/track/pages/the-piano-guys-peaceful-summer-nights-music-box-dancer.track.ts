import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPeacefulSummerNightsMusicBoxDancer = {
  id: "01a0afa1-c703-745f-8f33-0e02db1bb768",
  type: "page-type/track",
  slug: "the-piano-guys-peaceful-summer-nights-music-box-dancer",
  ownLength: 2.716266666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-peaceful-summer-nights"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5dukySw7gyngBJDML7EZwe",
      externalLink: "https://open.spotify.com/track/5dukySw7gyngBJDML7EZwe",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Music Box Dancer",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "musicboxdancer|0jW6R8CVyVohuUJVcuweDI|162976",
} as const satisfies Track
