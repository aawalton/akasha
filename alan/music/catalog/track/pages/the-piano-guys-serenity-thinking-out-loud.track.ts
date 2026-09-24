import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysSerenityThinkingOutLoud = {
  id: "01a0afa2-08f4-7764-b10e-5e2495b3ee14",
  type: "page-type/track",
  slug: "the-piano-guys-serenity-thinking-out-loud",
  ownLength: 3.8773333333333335,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-serenity"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Thinking Out Loud",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "thinkingoutloud|0jW6R8CVyVohuUJVcuweDI|232640",
  song: "song/the-piano-guys-thinking-out-loud",
  carriedBy: [
    {
      release: "release/the-piano-guys-serenity",
      discNumber: 1,
      position: 6,
      externalId: "1Ae4dcsK9fsfSBmZaHrvTF",
      externalLink: "https://open.spotify.com/track/1Ae4dcsK9fsfSBmZaHrvTF",
    },
  ],
} as const satisfies Track
