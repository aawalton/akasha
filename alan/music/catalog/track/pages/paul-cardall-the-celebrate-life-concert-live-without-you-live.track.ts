import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheCelebrateLifeConcertLiveWithoutYouLive = {
  id: "01a0b4c8-42a8-7ddb-ac01-ecae22683eba",
  type: "page-type/track",
  slug: "paul-cardall-the-celebrate-life-concert-live-without-you-live",
  ownLength: 2.3257833333333333,
  ownProgress: 2.3257833333333333,
  partOfCollections: ["release/paul-cardall-the-celebrate-life-concert-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Without You - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "withoutyoulive|7FQRbf8gbKw8KZQZAJWxH2|139547",
  song: "song/paul-cardall-without-you",
  carriedBy: [
    {
      release: "release/paul-cardall-the-celebrate-life-concert-live",
      discNumber: 1,
      position: 3,
      externalId: "68LlWKYaJ69ZdugM5zMJOx",
      externalLink: "https://open.spotify.com/track/68LlWKYaJ69ZdugM5zMJOx",
    },
  ],
} as const satisfies Track
