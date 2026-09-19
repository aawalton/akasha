import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPeacefulSummerNightsJesuJoy = {
  id: "01a0afa1-c72a-7dfe-a414-9fce6170155b",
  type: "page-type/track",
  slug: "the-piano-guys-peaceful-summer-nights-jesu-joy",
  ownLength: 3.269216666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-peaceful-summer-nights"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2TRHCk6gtIpT7wX4DoJlCA",
      externalLink: "https://open.spotify.com/track/2TRHCk6gtIpT7wX4DoJlCA",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Jesu Joy",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "jesujoy|0jW6R8CVyVohuUJVcuweDI|196153",
  song: "song/the-piano-guys-jesu-joy",
} as const satisfies Track
