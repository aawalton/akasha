import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe80sMomShorts = {
  id: "01a0b4c6-cf94-74de-8490-87d40fc379b9",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-80s-mom-shorts",
  ownLength: 2.031,
  ownProgress: 2.031,
  partOfCollections: ["release/the-holderness-family-best-of-the-80s"],
  status: "completed",
  unit: "unit/minutes",
  title: "Mom Shorts",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-holderness-family" }],
  trackKey: "momshorts|6tITG4T8LpC0msapZ4wXGA|121860",
  song: "song/the-holderness-family-mom-shorts",
  carriedBy: [
    {
      release: "release/the-holderness-family-best-of-the-80s",
      discNumber: 1,
      position: 11,
      externalId: "1Ozf0TelTxLG3WrMkkubfP",
      externalLink: "https://open.spotify.com/track/1Ozf0TelTxLG3WrMkkubfP",
    },
  ],
} as const satisfies Track
