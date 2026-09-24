import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheCelebrateLifeConcertLiveEyeToEyeLive = {
  id: "01a0b4c8-4381-78a3-b2a6-789353d1d302",
  type: "page-type/track",
  slug: "paul-cardall-the-celebrate-life-concert-live-eye-to-eye-live",
  ownLength: 3.8731,
  ownProgress: 3.8731,
  partOfCollections: ["release/paul-cardall-the-celebrate-life-concert-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Eye to Eye - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "eyetoeyelive|7FQRbf8gbKw8KZQZAJWxH2|232386",
  song: "song/paul-cardall-eye-to-eye",
  carriedBy: [
    {
      release: "release/paul-cardall-the-celebrate-life-concert-live",
      discNumber: 1,
      position: 9,
      externalId: "5fsc0oB7bEEDgHwfmY8cCh",
      externalLink: "https://open.spotify.com/track/5fsc0oB7bEEDgHwfmY8cCh",
    },
  ],
} as const satisfies Track
