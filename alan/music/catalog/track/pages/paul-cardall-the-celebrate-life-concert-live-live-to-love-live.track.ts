import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheCelebrateLifeConcertLiveLiveToLoveLive = {
  id: "01a0b4c8-43ce-780d-84c0-be3004d588ee",
  type: "page-type/track",
  slug: "paul-cardall-the-celebrate-life-concert-live-live-to-love-live",
  ownLength: 3.365883333333333,
  ownProgress: 3.365883333333333,
  partOfCollections: ["release/paul-cardall-the-celebrate-life-concert-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Live to Love - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "livetolovelive|7FQRbf8gbKw8KZQZAJWxH2|201953",
  song: "song/paul-cardall-live-to-love",
  carriedBy: [
    {
      release: "release/paul-cardall-the-celebrate-life-concert-live",
      discNumber: 1,
      position: 11,
      externalId: "703YvgITGNgXgZ8StmtwYh",
      externalLink: "https://open.spotify.com/track/703YvgITGNgXgZ8StmtwYh",
    },
  ],
} as const satisfies Track
