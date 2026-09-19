import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ClassicalLoveRomanceBeginAgain = {
  id: "01a0afa1-d18a-7eb2-b00a-2869d4728ca8",
  type: "page-type/track",
  slug: "the-piano-guys-3-classical-love-romance-begin-again",
  ownLength: 4.0917666666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-classical-love-romance"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1qSF2qBpQrsgGztDQfTPrR",
      externalLink: "https://open.spotify.com/track/1qSF2qBpQrsgGztDQfTPrR",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Begin Again",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "beginagain|0jW6R8CVyVohuUJVcuweDI|245506",
  song: "song/taylor-swift-begin-again",
} as const satisfies Track
