import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasHymnsSilentNight = {
  id: "01a0b4c8-551e-7d53-aea8-120c302ce86c",
  type: "page-type/track",
  slug: "paul-cardall-christmas-hymns-silent-night",
  ownLength: 3.858216666666667,
  ownProgress: 3.858216666666667,
  partOfCollections: ["release/paul-cardall-christmas-hymns"],
  status: "completed",
  unit: "unit/minutes",
  title: "Silent Night",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "silentnight|7FQRbf8gbKw8KZQZAJWxH2|231493",
  song: "song/celtic-woman-silent-night",
  carriedBy: [
    {
      release: "release/paul-cardall-christmas-hymns",
      discNumber: 1,
      position: 8,
      externalId: "6ce32lzE9vBNyXkdmsX17x",
      externalLink: "https://open.spotify.com/track/6ce32lzE9vBNyXkdmsX17x",
    },
  ],
} as const satisfies Track
