import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLiveTheReleaseLive = {
  id: "01a0b4c8-57ef-7324-9526-a2dbce3cf2ec",
  type: "page-type/track",
  slug: "paul-cardall-live-the-release-live",
  ownLength: 3.14355,
  ownProgress: 3.14355,
  partOfCollections: ["release/paul-cardall-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Release - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "thereleaselive|7FQRbf8gbKw8KZQZAJWxH2|188613",
  song: "song/paul-cardall-the-release",
  carriedBy: [
    {
      release: "release/paul-cardall-live",
      discNumber: 1,
      position: 5,
      externalId: "6dPi85bJs6tWOHijHjjIfB",
      externalLink: "https://open.spotify.com/track/6dPi85bJs6tWOHijHjjIfB",
    },
  ],
} as const satisfies Track
