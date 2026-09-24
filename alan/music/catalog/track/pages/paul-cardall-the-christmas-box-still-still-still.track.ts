import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxStillStillStill = {
  id: "01a0b4c8-6662-7c51-911b-847f939fada5",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-still-still-still",
  ownLength: 2.3033333333333332,
  ownProgress: 2.3033333333333332,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  status: "completed",
  unit: "unit/minutes",
  title: "Still, Still, Still",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "stillstillstill|7FQRbf8gbKw8KZQZAJWxH2|138200",
  song: "song/paul-cardall-still-still-still",
  carriedBy: [
    {
      release: "release/paul-cardall-the-christmas-box",
      discNumber: 1,
      position: 13,
      externalId: "2Wb98m8lm2krd0sKP3NnE5",
      externalLink: "https://open.spotify.com/track/2Wb98m8lm2krd0sKP3NnE5",
    },
  ],
} as const satisfies Track
