import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NewMoonShineCopperline = {
  id: "01a0abeb-3f44-7c22-b08e-d448e0de4e6e",
  type: "page-type/track",
  slug: "james-taylor-2-new-moon-shine-copperline",
  ownLength: 4.354416666666666,
  ownProgress: 4.354416666666666,
  partOfCollections: ["release/james-taylor-2-new-moon-shine"],
  status: "completed",
  unit: "unit/minutes",
  title: "Copperline",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "copperline|0vn7UBvSQECKJm2817Yf1P|261265",
  song: "song/james-taylor-copperline",
  carriedBy: [
    {
      release: "release/james-taylor-2-new-moon-shine",
      discNumber: 1,
      position: 1,
      externalId: "0i1XtQ6hOET96dz5oG45zl",
      externalLink: "https://open.spotify.com/track/0i1XtQ6hOET96dz5oG45zl",
    },
  ],
} as const satisfies Track
