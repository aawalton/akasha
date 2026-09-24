import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheCelebrateLifeConcertLiveWasatchLive = {
  id: "01a0b4c8-4287-735f-99a7-02a54e019d9a",
  type: "page-type/track",
  slug: "paul-cardall-the-celebrate-life-concert-live-wasatch-live",
  ownLength: 3.6741333333333333,
  ownProgress: 3.6741333333333333,
  partOfCollections: ["release/paul-cardall-the-celebrate-life-concert-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Wasatch - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "wasatchlive|7FQRbf8gbKw8KZQZAJWxH2|220448",
  song: "song/paul-cardall-wasatch",
  carriedBy: [
    {
      release: "release/paul-cardall-the-celebrate-life-concert-live",
      discNumber: 1,
      position: 2,
      externalId: "3cD94kaespYNz4NnTJdTnO",
      externalLink: "https://open.spotify.com/track/3cD94kaespYNz4NnTJdTnO",
    },
  ],
} as const satisfies Track
