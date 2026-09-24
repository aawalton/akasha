import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxTheStoneAngel = {
  id: "01a0b4c8-668a-71e4-9aba-43aa92a768e4",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-the-stone-angel",
  ownLength: 3.266,
  ownProgress: 3.266,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Stone Angel",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "thestoneangel|7FQRbf8gbKw8KZQZAJWxH2|195960",
  song: "song/paul-cardall-the-stone-angel",
  carriedBy: [
    {
      release: "release/paul-cardall-the-christmas-box",
      discNumber: 1,
      position: 14,
      externalId: "0wUgIxjnKW5crPpHGlAnms",
      externalLink: "https://open.spotify.com/track/0wUgIxjnKW5crPpHGlAnms",
    },
  ],
} as const satisfies Track
