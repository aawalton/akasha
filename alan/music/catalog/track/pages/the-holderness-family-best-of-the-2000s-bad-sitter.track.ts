import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe2000sBadSitter = {
  id: "01a0b4c6-ce39-7969-afc2-9cef6a62208e",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-2000s-bad-sitter",
  ownLength: 2.1096,
  ownProgress: 2.1096,
  partOfCollections: ["release/the-holderness-family-best-of-the-2000s"],
  status: "completed",
  unit: "unit/minutes",
  title: "Bad Sitter",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-holderness-family" }],
  trackKey: "badsitter|6tITG4T8LpC0msapZ4wXGA|126576",
  song: "song/the-holderness-family-bad-sitter",
  carriedBy: [
    {
      release: "release/the-holderness-family-best-of-the-2000s",
      discNumber: 1,
      position: 9,
      externalId: "42AAlTcntyAJU3J6HCjLVV",
      externalLink: "https://open.spotify.com/track/42AAlTcntyAJU3J6HCjLVV",
    },
  ],
} as const satisfies Track
