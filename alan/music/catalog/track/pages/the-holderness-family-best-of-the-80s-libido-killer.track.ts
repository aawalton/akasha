import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe80sLibidoKiller = {
  id: "01a0b4c6-ce77-71f4-b0bb-ab2792b9795c",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-80s-libido-killer",
  ownLength: 3.0145,
  ownProgress: 3.0145,
  partOfCollections: ["release/the-holderness-family-best-of-the-80s"],
  status: "completed",
  unit: "unit/minutes",
  title: "Libido Killer",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-holderness-family" }],
  trackKey: "libidokiller|6tITG4T8LpC0msapZ4wXGA|180870",
  song: "song/the-holderness-family-libido-killer",
  carriedBy: [
    {
      release: "release/the-holderness-family-best-of-the-80s",
      discNumber: 1,
      position: 2,
      externalId: "2AD27VdzUAxqpWzDerkkKm",
      externalLink: "https://open.spotify.com/track/2AD27VdzUAxqpWzDerkkKm",
    },
  ],
} as const satisfies Track
