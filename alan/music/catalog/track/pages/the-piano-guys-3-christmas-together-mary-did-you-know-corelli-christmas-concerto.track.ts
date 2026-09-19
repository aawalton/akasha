import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ChristmasTogetherMaryDidYouKnowCorelliChristmasConcerto = {
  id: "01a0afa2-0ff4-738e-97c3-bdad7f83b443",
  type: "page-type/track",
  slug: "the-piano-guys-3-christmas-together-mary-did-you-know-corelli-christmas-concerto",
  ownLength: 4.020833333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-christmas-together"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Jzn6KVh61KqDjRKpIeDlW",
      externalLink: "https://open.spotify.com/track/5Jzn6KVh61KqDjRKpIeDlW",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Mary Did You Know / Corelli Christmas Concerto",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "marydidyouknowcorellichristmasconcerto|0jW6R8CVyVohuUJVcuweDI|241250",
  song: "song/the-piano-guys-mary-did-you-know-corelli-christmas-concerto",
} as const satisfies Track
