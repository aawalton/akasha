import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeLoveMeHarderLoveMeHarderACappella = {
  id: "01a0a6c5-3c4b-7383-844b-7f48460bdefc",
  type: "page-type/track",
  slug: "ariana-grande-love-me-harder-love-me-harder-a-cappella",
  ownLength: 3.8943833333333333,
  ownProgress: 3.8943833333333333,
  partOfCollections: ["release/ariana-grande-love-me-harder"],
  status: "completed",
  unit: "unit/minutes",
  title: "Love Me Harder - A Cappella",
  trackType: "a-cappella",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }, { artistName: "The Weeknd" }],
  trackKey: "lovemeharderacappella|1Xyo4u8uXC1ZmMpatF05PJ,66CXWjxzNUsdJxJ2JdwvnR|233663",
  song: "song/ariana-grande-love-me-harder",
  carriedBy: [
    {
      release: "release/ariana-grande-love-me-harder",
      discNumber: 1,
      position: 2,
      externalId: "071IQ2wufBbCpB95z7VU7i",
      externalLink: "https://open.spotify.com/track/071IQ2wufBbCpB95z7VU7i",
    },
  ],
} as const satisfies Track
