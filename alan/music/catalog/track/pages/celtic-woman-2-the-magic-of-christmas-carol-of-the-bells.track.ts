import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2TheMagicOfChristmasCarolOfTheBells = {
  id: "01a0abea-57cd-7705-8b2c-4c03aa2947b3",
  type: "page-type/track",
  slug: "celtic-woman-2-the-magic-of-christmas-carol-of-the-bells",
  ownLength: 3.4006666666666665,
  ownProgress: 3.4006666666666665,
  partOfCollections: ["release/celtic-woman-2-the-magic-of-christmas"],
  status: "completed",
  unit: "unit/minutes",
  title: "Carol Of The Bells",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "carolofthebells|6NWtt9pNOL2Gx7kBykdE5x|204040",
  song: "song/celtic-woman-carol-of-the-bells",
  carriedBy: [
    {
      release: "release/celtic-woman-2-the-magic-of-christmas",
      discNumber: 1,
      position: 11,
      externalId: "0g1QIgjXadbcKdJnkFU5qB",
      externalLink: "https://open.spotify.com/track/0g1QIgjXadbcKdJnkFU5qB",
    },
  ],
} as const satisfies Track
