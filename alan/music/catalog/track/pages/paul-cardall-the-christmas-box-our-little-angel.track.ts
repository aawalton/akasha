import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxOurLittleAngel = {
  id: "01a0b4c8-64bc-7801-812f-7b5f74dca940",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-our-little-angel",
  ownLength: 2.9811,
  ownProgress: 2.9811,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  status: "completed",
  unit: "unit/minutes",
  title: "Our Little Angel",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "ourlittleangel|7FQRbf8gbKw8KZQZAJWxH2|178866",
  song: "song/paul-cardall-our-little-angel",
  carriedBy: [
    {
      release: "release/paul-cardall-the-christmas-box",
      discNumber: 1,
      position: 2,
      externalId: "3yuWnTfxvtGWKnauBaS9Hg",
      externalLink: "https://open.spotify.com/track/3yuWnTfxvtGWKnauBaS9Hg",
    },
  ],
} as const satisfies Track
