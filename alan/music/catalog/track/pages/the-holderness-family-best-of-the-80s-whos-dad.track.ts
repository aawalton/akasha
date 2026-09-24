import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe80sWhosDad = {
  id: "01a0b4c6-cf74-7fa6-8924-08dc95205fe6",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-80s-whos-dad",
  ownLength: 2.0610333333333335,
  ownProgress: 2.0610333333333335,
  partOfCollections: ["release/the-holderness-family-best-of-the-80s"],
  status: "completed",
  unit: "unit/minutes",
  title: "Who's Dad?",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-holderness-family" }],
  trackKey: "whosdad|6tITG4T8LpC0msapZ4wXGA|123662",
  song: "song/the-holderness-family-whos-dad",
  carriedBy: [
    {
      release: "release/the-holderness-family-best-of-the-80s",
      discNumber: 1,
      position: 10,
      externalId: "7nL9bbnt55XuJp2A5VA1QH",
      externalLink: "https://open.spotify.com/track/7nL9bbnt55XuJp2A5VA1QH",
    },
  ],
} as const satisfies Track
