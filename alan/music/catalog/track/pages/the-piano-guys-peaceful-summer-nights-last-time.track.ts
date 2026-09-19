import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPeacefulSummerNightsLastTime = {
  id: "01a0afa1-c61b-7983-9f4e-6334e3a88c17",
  type: "page-type/track",
  slug: "the-piano-guys-peaceful-summer-nights-last-time",
  ownLength: 3.1416666666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-peaceful-summer-nights"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7bwLn0N9ZGjShX6tgymghY",
      externalLink: "https://open.spotify.com/track/7bwLn0N9ZGjShX6tgymghY",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Last Time",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "lasttime|0jW6R8CVyVohuUJVcuweDI|188500",
  song: "song/the-piano-guys-last-time",
} as const satisfies Track
