import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSavingTinyHeartsGraciesTheme = {
  id: "01a0b4c8-3cae-732c-8b89-202d3f8191c3",
  type: "page-type/track",
  slug: "paul-cardall-saving-tiny-hearts-gracies-theme",
  ownLength: 4.637766666666667,
  ownProgress: 4.637766666666667,
  partOfCollections: ["release/paul-cardall-saving-tiny-hearts"],
  status: "completed",
  unit: "unit/minutes",
  title: "Gracie's Theme",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "graciestheme|7FQRbf8gbKw8KZQZAJWxH2|278266",
  song: "song/paul-cardall-gracies-theme",
  carriedBy: [
    {
      release: "release/paul-cardall-saving-tiny-hearts",
      discNumber: 1,
      position: 1,
      externalId: "6JcdNN2XJezTa49WJUn2yW",
      externalLink: "https://open.spotify.com/track/6JcdNN2XJezTa49WJUn2yW",
    },
  ],
} as const satisfies Track
