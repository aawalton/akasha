import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxTheWidowsMansion = {
  id: "01a0b4c8-64ff-7b79-a64c-0b99ddf134a0",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-the-widows-mansion",
  ownLength: 3.4584333333333332,
  ownProgress: 3.4584333333333332,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Widow's Mansion",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "thewidowsmansion|7FQRbf8gbKw8KZQZAJWxH2|207506",
  song: "song/paul-cardall-the-widows-mansion",
  carriedBy: [
    {
      release: "release/paul-cardall-the-christmas-box",
      discNumber: 1,
      position: 4,
      externalId: "2bGjRctbOVEeOBgYiHlQNi",
      externalLink: "https://open.spotify.com/track/2bGjRctbOVEeOBgYiHlQNi",
    },
  ],
} as const satisfies Track
