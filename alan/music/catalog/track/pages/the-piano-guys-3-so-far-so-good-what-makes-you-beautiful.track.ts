import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3SoFarSoGoodWhatMakesYouBeautiful = {
  id: "01a0afa2-1c61-7408-8fca-26b73fdb7c9a",
  type: "page-type/track",
  slug: "the-piano-guys-3-so-far-so-good-what-makes-you-beautiful",
  ownLength: 2.89555,
  ownProgress: 2.89555,
  partOfCollections: ["release/the-piano-guys-3-so-far-so-good"],
  status: "completed",
  unit: "unit/minutes",
  title: "What Makes You Beautiful",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "whatmakesyoubeautiful|0jW6R8CVyVohuUJVcuweDI|173733",
  song: "song/the-piano-guys-what-makes-you-beautiful",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-so-far-so-good",
      discNumber: 1,
      position: 12,
      externalId: "4vzGWOgAnkFCEwvNRPjZY0",
      externalLink: "https://open.spotify.com/track/4vzGWOgAnkFCEwvNRPjZY0",
    },
  ],
} as const satisfies Track
