import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysSerenityThinkingOutLoud = {
  id: "01a0afa2-08f4-7764-b10e-5e2495b3ee14",
  type: "page-type/track",
  slug: "the-piano-guys-serenity-thinking-out-loud",
  ownLength: 3.8773333333333335,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-serenity"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Ae4dcsK9fsfSBmZaHrvTF",
      externalLink: "https://open.spotify.com/track/1Ae4dcsK9fsfSBmZaHrvTF",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Thinking Out Loud",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "thinkingoutloud|0jW6R8CVyVohuUJVcuweDI|232640",
  song: "song/the-piano-guys-thinking-out-loud",
} as const satisfies Track
