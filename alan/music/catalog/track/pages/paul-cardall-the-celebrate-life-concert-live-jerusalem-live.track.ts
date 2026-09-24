import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheCelebrateLifeConcertLiveJerusalemLive = {
  id: "01a0b4c8-4418-7183-8f90-60602c6c057f",
  type: "page-type/track",
  slug: "paul-cardall-the-celebrate-life-concert-live-jerusalem-live",
  ownLength: 5.994233333333334,
  ownProgress: 5.994233333333334,
  partOfCollections: ["release/paul-cardall-the-celebrate-life-concert-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Jerusalem - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }, { artistName: "Peter Breinholt" }],
  trackKey: "jerusalemlive|0do1x1rbJllT74h9mwoB2U,7FQRbf8gbKw8KZQZAJWxH2|359654",
  song: "song/paul-cardall-jerusalem",
  carriedBy: [
    {
      release: "release/paul-cardall-the-celebrate-life-concert-live",
      discNumber: 1,
      position: 13,
      externalId: "7emFfTaoWmPcJpRVxLpzk6",
      externalLink: "https://open.spotify.com/track/7emFfTaoWmPcJpRVxLpzk6",
    },
  ],
} as const satisfies Track
