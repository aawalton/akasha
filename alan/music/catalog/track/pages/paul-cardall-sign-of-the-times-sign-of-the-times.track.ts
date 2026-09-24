import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSignOfTheTimesSignOfTheTimes = {
  id: "01a0b4c8-6a2e-7337-9069-c11229724806",
  type: "page-type/track",
  slug: "paul-cardall-sign-of-the-times-sign-of-the-times",
  ownLength: 4.18385,
  ownProgress: 4.18385,
  partOfCollections: ["release/paul-cardall-sign-of-the-times"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sign of the Times",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "signofthetimes|7FQRbf8gbKw8KZQZAJWxH2|251031",
  song: "song/paul-cardall-sign-of-the-times",
  carriedBy: [
    {
      release: "release/paul-cardall-sign-of-the-times",
      discNumber: 1,
      position: 1,
      externalId: "6zoDUTcV8tJ0UOCYGuQSPT",
      externalLink: "https://open.spotify.com/track/6zoDUTcV8tJ0UOCYGuQSPT",
    },
  ],
} as const satisfies Track
