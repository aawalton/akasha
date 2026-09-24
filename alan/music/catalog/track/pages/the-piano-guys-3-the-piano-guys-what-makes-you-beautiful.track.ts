import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuysWhatMakesYouBeautiful = {
  id: "01a0afa2-1a47-7175-b5c5-312867ca128a",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-what-makes-you-beautiful",
  ownLength: 2.96145,
  ownProgress: 2.96145,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys"],
  status: "completed",
  unit: "unit/minutes",
  title: "What Makes You Beautiful",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "whatmakesyoubeautiful|0jW6R8CVyVohuUJVcuweDI|177687",
  song: "song/the-piano-guys-what-makes-you-beautiful",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-the-piano-guys",
      discNumber: 1,
      position: 13,
      externalId: "78sadk681kINGMrxXw1iDl",
      externalLink: "https://open.spotify.com/track/78sadk681kINGMrxXw1iDl",
    },
  ],
} as const satisfies Track
