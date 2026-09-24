import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLiveGoneHomeLiveToLoveLive = {
  id: "01a0b4c8-575f-7e49-b615-e84f79508a02",
  type: "page-type/track",
  slug: "paul-cardall-live-gone-home-live-to-love-live",
  ownLength: 4.114216666666667,
  ownProgress: 4.114216666666667,
  partOfCollections: ["release/paul-cardall-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Gone Home/Live To Love - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "gonehomelivetolovelive|7FQRbf8gbKw8KZQZAJWxH2|246853",
  song: "song/paul-cardall-gone-home-live-to-love",
  carriedBy: [
    {
      release: "release/paul-cardall-live",
      discNumber: 1,
      position: 1,
      externalId: "6hqxxYa2FCv9iWLp3hMtrp",
      externalLink: "https://open.spotify.com/track/6hqxxYa2FCv9iWLp3hMtrp",
    },
  ],
} as const satisfies Track
