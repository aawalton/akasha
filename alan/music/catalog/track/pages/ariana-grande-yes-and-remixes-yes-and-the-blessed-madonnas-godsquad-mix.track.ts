import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYesAndRemixesYesAndTheBlessedMadonnasGodsquadMix = {
  id: "01a0a6c5-3614-7ce8-967f-be462c270a89",
  type: "page-type/track",
  slug: "ariana-grande-yes-and-remixes-yes-and-the-blessed-madonnas-godsquad-mix",
  ownLength: 5.033033333333333,
  ownProgress: 5.033033333333333,
  partOfCollections: [
    "release/ariana-grande-yes-and-remixes",
    "release/ariana-grande-yes-and-the-blessed-madonna-s-godsquad-mix",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "yes, and? - The Blessed Madonna’s Godsquad Mix",
  trackType: "remix",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }, { artistName: "The Blessed Madonna" }],
  trackKey:
    "yesandtheblessedmadonnasgodsquadmix|4TvhRzxIL1le2PWCeUqxQw,66CXWjxzNUsdJxJ2JdwvnR|301982",
  song: "song/ariana-grande-yes-and",
  carriedBy: [
    {
      release: "release/ariana-grande-yes-and-remixes",
      discNumber: 1,
      position: 3,
      externalId: "1GxNDaFx9411X1g7cCf55E",
      externalLink: "https://open.spotify.com/track/1GxNDaFx9411X1g7cCf55E",
    },
    {
      release: "release/ariana-grande-yes-and-the-blessed-madonna-s-godsquad-mix",
      discNumber: 1,
      position: 1,
      externalId: "5jvgyMX8IQwzpGeWi6P4Xo",
      externalLink: "https://open.spotify.com/track/5jvgyMX8IQwzpGeWi6P4Xo",
    },
  ],
} as const satisfies Track
