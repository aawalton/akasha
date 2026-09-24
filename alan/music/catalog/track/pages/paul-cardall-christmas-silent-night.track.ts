import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasSilentNight = {
  id: "01a0b4c8-354a-7cc0-a621-655a42f3bacc",
  type: "page-type/track",
  slug: "paul-cardall-christmas-silent-night",
  ownLength: 5.309583333333333,
  ownProgress: 5.309583333333333,
  partOfCollections: ["release/paul-cardall-christmas"],
  status: "completed",
  unit: "unit/minutes",
  title: "Silent Night",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "silentnight|7FQRbf8gbKw8KZQZAJWxH2|318575",
  song: "song/celtic-woman-silent-night",
  carriedBy: [
    {
      release: "release/paul-cardall-christmas",
      discNumber: 1,
      position: 13,
      externalId: "4LMbxeeC5L3ePo2d3R1rUd",
      externalLink: "https://open.spotify.com/track/4LMbxeeC5L3ePo2d3R1rUd",
    },
  ],
} as const satisfies Track
