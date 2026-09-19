import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LullabyOdeToJoy = {
  id: "01a0afa1-dec0-7c17-bf16-6aa5513e867d",
  type: "page-type/track",
  slug: "the-piano-guys-3-lullaby-ode-to-joy",
  ownLength: 1.7685166666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-lullaby"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3xgOuXgX8txPONEVoD5Hqd",
      externalLink: "https://open.spotify.com/track/3xgOuXgX8txPONEVoD5Hqd",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Ode To Joy",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "odetojoy|0jW6R8CVyVohuUJVcuweDI|106111",
  song: "song/the-piano-guys-ode-to-joy",
} as const satisfies Track
