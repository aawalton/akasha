import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysRelaxingPianoJesuJoy = {
  id: "01a0afa1-cc28-717b-9953-c863c1528ba9",
  type: "page-type/track",
  slug: "the-piano-guys-relaxing-piano-jesu-joy",
  ownLength: 3.269216666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-relaxing-piano"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5aUYrsKtkjvFjkqhUGh5Rr",
      externalLink: "https://open.spotify.com/track/5aUYrsKtkjvFjkqhUGh5Rr",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Jesu Joy",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "jesujoy|0jW6R8CVyVohuUJVcuweDI|196153",
  song: "song/the-piano-guys-jesu-joy",
} as const satisfies Track
