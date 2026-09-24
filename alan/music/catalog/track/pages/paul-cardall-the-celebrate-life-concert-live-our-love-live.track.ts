import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheCelebrateLifeConcertLiveOurLoveLive = {
  id: "01a0b4c8-42c9-74e6-adb3-52e4ced0cc06",
  type: "page-type/track",
  slug: "paul-cardall-the-celebrate-life-concert-live-our-love-live",
  ownLength: 3.267933333333333,
  ownProgress: 3.267933333333333,
  partOfCollections: ["release/paul-cardall-the-celebrate-life-concert-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Our Love - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "ourlovelive|7FQRbf8gbKw8KZQZAJWxH2|196076",
  song: "song/paul-cardall-our-love",
  carriedBy: [
    {
      release: "release/paul-cardall-the-celebrate-life-concert-live",
      discNumber: 1,
      position: 4,
      externalId: "0i1WmQha95hsNXOMNJULmR",
      externalLink: "https://open.spotify.com/track/0i1WmQha95hsNXOMNJULmR",
    },
  ],
} as const satisfies Track
