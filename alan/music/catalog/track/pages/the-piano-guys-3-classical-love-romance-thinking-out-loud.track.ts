import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ClassicalLoveRomanceThinkingOutLoud = {
  id: "01a0afa1-d123-79ec-ab91-6f63d16143a4",
  type: "page-type/track",
  slug: "the-piano-guys-3-classical-love-romance-thinking-out-loud",
  ownLength: 3.877266666666667,
  ownProgress: 3.877266666666667,
  partOfCollections: ["release/the-piano-guys-3-classical-love-romance"],
  position: 2,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5j4aplOEPlnQQojKXL0NX8",
      externalLink: "https://open.spotify.com/track/5j4aplOEPlnQQojKXL0NX8",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Thinking Out Loud",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "thinkingoutloud|0jW6R8CVyVohuUJVcuweDI|232636",
  song: "song/the-piano-guys-thinking-out-loud",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-classical-love-romance",
      discNumber: 1,
      position: 2,
      externalId: "5j4aplOEPlnQQojKXL0NX8",
      externalLink: "https://open.spotify.com/track/5j4aplOEPlnQQojKXL0NX8",
    },
  ],
} as const satisfies Track
