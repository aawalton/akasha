import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLiveAKissOfTheSunlightLive = {
  id: "01a0b4c8-58b2-7663-a9e2-faa4149a776a",
  type: "page-type/track",
  slug: "paul-cardall-live-a-kiss-of-the-sunlight-live",
  ownLength: 3.7357666666666667,
  ownProgress: 3.7357666666666667,
  partOfCollections: ["release/paul-cardall-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "A Kiss Of The Sunlight - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "akissofthesunlightlive|7FQRbf8gbKw8KZQZAJWxH2|224146",
  song: "song/paul-cardall-a-kiss-of-the-sunlight",
  carriedBy: [
    {
      release: "release/paul-cardall-live",
      discNumber: 1,
      position: 10,
      externalId: "6i7UE3Kn2Q8CDNCrU54zo3",
      externalLink: "https://open.spotify.com/track/6i7UE3Kn2Q8CDNCrU54zo3",
    },
  ],
} as const satisfies Track
