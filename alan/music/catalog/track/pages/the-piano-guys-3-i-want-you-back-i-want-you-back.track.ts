import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3IWantYouBackIWantYouBack = {
  id: "01a0afa2-1eec-7472-ae4b-95d8d76a1256",
  type: "page-type/track",
  slug: "the-piano-guys-3-i-want-you-back-i-want-you-back",
  ownLength: 3.0170333333333335,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-i-want-you-back"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Ysbm2Ee2V0TH7tQtAaYMN",
      externalLink: "https://open.spotify.com/track/5Ysbm2Ee2V0TH7tQtAaYMN",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "I Want You Back",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4xRLKAf96K6YdGDWjY6ra8", artistName: "Berry Gordy" },
    { externalId: "5aIqB5nVVvmFsvSdExz408", artistName: "Johann Sebastian Bach" },
    { externalId: "7wjuWOChevyzU6GoTfo3LO", artistName: "Alphonso Mizell" },
    { externalId: "6LTSK6whg1ZFZu6Uhk1S7P", artistName: "Frederick Perren" },
    { externalId: "4Rpq61lrW95EsZMlqMObli", artistName: "Deke Richards" },
    { externalId: "70Q1hGbTxHJYRqEvTYeoOw", artistName: "Freddie Perren" },
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
  ],
  trackKey:
    "iwantyouback|0jW6R8CVyVohuUJVcuweDI,4Rpq61lrW95EsZMlqMObli,4xRLKAf96K6YdGDWjY6ra8,5aIqB5nVVvmFsvSdExz408,6LTSK6whg1ZFZu6Uhk1S7P,70Q1hGbTxHJYRqEvTYeoOw,7wjuWOChevyzU6GoTfo3LO|181022",
  song: "song/the-piano-guys-i-want-you-back",
} as const satisfies Track
