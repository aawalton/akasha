import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallNewLifeRestlessHope = {
  id: "01a0b4c8-3f87-70e6-ba8b-2c83cdf6390b",
  type: "page-type/track",
  slug: "paul-cardall-new-life-restless-hope",
  ownLength: 2.2866666666666666,
  ownProgress: 2.2866666666666666,
  partOfCollections: ["release/paul-cardall-new-life"],
  status: "completed",
  unit: "unit/minutes",
  title: "Restless Hope",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "restlesshope|7FQRbf8gbKw8KZQZAJWxH2|137200",
  song: "song/paul-cardall-restless-hope",
  carriedBy: [
    {
      release: "release/paul-cardall-new-life",
      discNumber: 1,
      position: 8,
      externalId: "0k9om25NDDRTCrxqzUTdVo",
      externalLink: "https://open.spotify.com/track/0k9om25NDDRTCrxqzUTdVo",
    },
  ],
} as const satisfies Track
