import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxSilentNight = {
  id: "01a0b4c8-6709-7867-af8d-4f1c28a522c3",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-silent-night",
  ownLength: 5.466666666666667,
  ownProgress: 5.466666666666667,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  status: "completed",
  unit: "unit/minutes",
  title: "Silent Night",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "silentnight|7FQRbf8gbKw8KZQZAJWxH2|328000",
  song: "song/celtic-woman-silent-night",
  carriedBy: [
    {
      release: "release/paul-cardall-the-christmas-box",
      discNumber: 1,
      position: 17,
      externalId: "5GiLifDol2BAvcv5JKb3JB",
      externalLink: "https://open.spotify.com/track/5GiLifDol2BAvcv5JKb3JB",
    },
  ],
} as const satisfies Track
