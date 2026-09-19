import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LiveWhatMakesYouBeautifulLive = {
  id: "01a0afa2-157a-72b7-90f5-1af1176ee161",
  type: "page-type/track",
  slug: "the-piano-guys-3-live-what-makes-you-beautiful-live",
  ownLength: 3.858216666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-live"],
  position: 19,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2fib3NtQzWsTvXheOgWA3b",
      externalLink: "https://open.spotify.com/track/2fib3NtQzWsTvXheOgWA3b",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "What Makes You Beautiful (Live)",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "whatmakesyoubeautifullive|0jW6R8CVyVohuUJVcuweDI|231493",
  song: "song/the-piano-guys-what-makes-you-beautiful",
} as const satisfies Track
