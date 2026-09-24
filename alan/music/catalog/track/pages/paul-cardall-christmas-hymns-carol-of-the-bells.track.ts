import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasHymnsCarolOfTheBells = {
  id: "01a0b4c8-5431-72fb-9a64-2df144db797b",
  type: "page-type/track",
  slug: "paul-cardall-christmas-hymns-carol-of-the-bells",
  ownLength: 5.444216666666667,
  ownProgress: 5.444216666666667,
  partOfCollections: ["release/paul-cardall-christmas-hymns"],
  status: "completed",
  unit: "unit/minutes",
  title: "Carol of the Bells",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "carolofthebells|7FQRbf8gbKw8KZQZAJWxH2|326653",
  song: "song/paul-cardall-carol-of-the-bells",
  carriedBy: [
    {
      release: "release/paul-cardall-christmas-hymns",
      discNumber: 1,
      position: 2,
      externalId: "3pvJZWw19gTR7143IAYG7P",
      externalLink: "https://open.spotify.com/track/3pvJZWw19gTR7143IAYG7P",
    },
  ],
} as const satisfies Track
