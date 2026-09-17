import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3PopOnPianoWhatMakesYouBeautiful = {
  id: "01a0afa1-cf31-7bc1-ab1c-3e1224bc4aef",
  type: "page-type/track",
  slug: "the-piano-guys-3-pop-on-piano-what-makes-you-beautiful",
  ownLength: 2.873066666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-pop-on-piano"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2RoADDwjnAQjzdnkTl6F7C",
      externalLink: "https://open.spotify.com/track/2RoADDwjnAQjzdnkTl6F7C",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "What Makes You Beautiful",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "whatmakesyoubeautiful|0jW6R8CVyVohuUJVcuweDI|172384",
} as const satisfies Track
