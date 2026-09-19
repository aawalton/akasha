import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2TheMagicOfChristmasCarolOfTheBells = {
  id: "01a0abea-57cd-7705-8b2c-4c03aa2947b3",
  type: "page-type/track",
  slug: "celtic-woman-2-the-magic-of-christmas-carol-of-the-bells",
  ownLength: 3.4006666666666665,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-the-magic-of-christmas"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0g1QIgjXadbcKdJnkFU5qB",
      externalLink: "https://open.spotify.com/track/0g1QIgjXadbcKdJnkFU5qB",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Carol Of The Bells",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "carolofthebells|6NWtt9pNOL2Gx7kBykdE5x|204040",
  song: "song/celtic-woman-carol-of-the-bells",
} as const satisfies Track
