import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxTheDen = {
  id: "01a0b4c8-654f-7b92-8cd5-455589a813ad",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-the-den",
  ownLength: 2.2582166666666668,
  ownProgress: 2.2582166666666668,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Den",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "theden|7FQRbf8gbKw8KZQZAJWxH2|135493",
  song: "song/paul-cardall-the-den",
  carriedBy: [
    {
      release: "release/paul-cardall-the-christmas-box",
      discNumber: 1,
      position: 6,
      externalId: "3XD6ZjndAIEUCUcqQkVdHg",
      externalLink: "https://open.spotify.com/track/3XD6ZjndAIEUCUcqQkVdHg",
    },
  ],
} as const satisfies Track
