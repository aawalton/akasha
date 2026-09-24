import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe90sPumpkinSpiceLatte = {
  id: "01a0b4c6-d10c-7afa-8d4e-3f5e589f2ddf",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-90s-pumpkin-spice-latte",
  ownLength: 2.6893,
  ownProgress: 2.6893,
  partOfCollections: ["release/the-holderness-family-best-of-the-90s"],
  status: "completed",
  unit: "unit/minutes",
  title: "Pumpkin Spice Latte",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-holderness-family" }],
  trackKey: "pumpkinspicelatte|6tITG4T8LpC0msapZ4wXGA|161358",
  song: "song/the-holderness-family-pumpkin-spice-latte",
  carriedBy: [
    {
      release: "release/the-holderness-family-best-of-the-90s",
      discNumber: 1,
      position: 10,
      externalId: "638rN57DGb8f3NthQJxkdA",
      externalLink: "https://open.spotify.com/track/638rN57DGb8f3NthQJxkdA",
    },
  ],
} as const satisfies Track
