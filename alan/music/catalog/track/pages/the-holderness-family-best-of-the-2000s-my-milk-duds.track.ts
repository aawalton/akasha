import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe2000sMyMilkDuds = {
  id: "01a0b4c6-cdb5-7cfd-96b4-ec136b27fffd",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-2000s-my-milk-duds",
  ownLength: 1.122,
  ownProgress: 1.122,
  partOfCollections: ["release/the-holderness-family-best-of-the-2000s"],
  status: "completed",
  unit: "unit/minutes",
  title: "My Milk Duds",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-holderness-family" }],
  trackKey: "mymilkduds|6tITG4T8LpC0msapZ4wXGA|67320",
  song: "song/the-holderness-family-my-milk-duds",
  carriedBy: [
    {
      release: "release/the-holderness-family-best-of-the-2000s",
      discNumber: 1,
      position: 5,
      externalId: "05YUsvsElWNtUi22qCefPW",
      externalLink: "https://open.spotify.com/track/05YUsvsElWNtUi22qCefPW",
    },
  ],
} as const satisfies Track
