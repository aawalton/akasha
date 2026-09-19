import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310ThinkingOutLoud = {
  id: "01a0afa2-0ad1-7f4c-9b50-e0ebfb48f554",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-thinking-out-loud",
  ownLength: 3.877266666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-10"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "55Kunp4OMnygqTnW7jgua4",
      externalLink: "https://open.spotify.com/track/55Kunp4OMnygqTnW7jgua4",
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
} as const satisfies Track
