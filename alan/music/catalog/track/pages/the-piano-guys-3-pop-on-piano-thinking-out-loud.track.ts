import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3PopOnPianoThinkingOutLoud = {
  id: "01a0afa1-cdf5-7674-b8ee-4e41222518fc",
  type: "page-type/track",
  slug: "the-piano-guys-3-pop-on-piano-thinking-out-loud",
  ownLength: 3.877266666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-pop-on-piano"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "752jJnfS04iL1jSlpp9Ttj",
      externalLink: "https://open.spotify.com/track/752jJnfS04iL1jSlpp9Ttj",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Thinking Out Loud",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "thinkingoutloud|0jW6R8CVyVohuUJVcuweDI|232636",
  song: "song/the-piano-guys-thinking-out-loud",
} as const satisfies Track
