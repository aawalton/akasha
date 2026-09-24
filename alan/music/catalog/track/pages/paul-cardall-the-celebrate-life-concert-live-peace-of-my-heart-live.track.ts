import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheCelebrateLifeConcertLivePeaceOfMyHeartLive = {
  id: "01a0b4c8-4264-7219-8d14-77a95d951ecb",
  type: "page-type/track",
  slug: "paul-cardall-the-celebrate-life-concert-live-peace-of-my-heart-live",
  ownLength: 3.7542166666666668,
  ownProgress: 3.7542166666666668,
  partOfCollections: ["release/paul-cardall-the-celebrate-life-concert-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Peace of My Heart - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "peaceofmyheartlive|7FQRbf8gbKw8KZQZAJWxH2|225253",
  song: "song/paul-cardall-peace-of-my-heart",
  carriedBy: [
    {
      release: "release/paul-cardall-the-celebrate-life-concert-live",
      discNumber: 1,
      position: 1,
      externalId: "2HZsCIOuBwgirqyKlirNJq",
      externalLink: "https://open.spotify.com/track/2HZsCIOuBwgirqyKlirNJq",
    },
  ],
} as const satisfies Track
