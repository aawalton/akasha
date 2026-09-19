import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSignOfTheTimesSignOfTheTimes = {
  id: "01a0b4c8-6a2e-7337-9069-c11229724806",
  type: "page-type/track",
  slug: "paul-cardall-sign-of-the-times-sign-of-the-times",
  ownLength: 4.18385,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-sign-of-the-times"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6zoDUTcV8tJ0UOCYGuQSPT",
      externalLink: "https://open.spotify.com/track/6zoDUTcV8tJ0UOCYGuQSPT",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Sign of the Times",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "signofthetimes|7FQRbf8gbKw8KZQZAJWxH2|251031",
  song: "song/paul-cardall-sign-of-the-times",
} as const satisfies Track
