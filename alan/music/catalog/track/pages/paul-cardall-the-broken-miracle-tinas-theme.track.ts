import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheBrokenMiracleTinasTheme = {
  id: "01a0b4c8-30a8-7e75-b67b-23f9f83acebb",
  type: "page-type/track",
  slug: "paul-cardall-the-broken-miracle-tinas-theme",
  ownLength: 3.66155,
  ownProgress: 3.66155,
  partOfCollections: ["release/paul-cardall-the-broken-miracle"],
  status: "completed",
  unit: "unit/minutes",
  title: "Tina’s Theme",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "tinastheme|7FQRbf8gbKw8KZQZAJWxH2|219693",
  song: "song/paul-cardall-tinas-theme",
  carriedBy: [
    {
      release: "release/paul-cardall-the-broken-miracle",
      discNumber: 1,
      position: 15,
      externalId: "6mWeUh9FaEEXy6rWaLYQh2",
      externalLink: "https://open.spotify.com/track/6mWeUh9FaEEXy6rWaLYQh2",
    },
  ],
} as const satisfies Track
