import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeLoveMeHarderLoveMeHarderInstrumental = {
  id: "01a0a6c5-3c6b-7027-a4ec-d2a9317c05a1",
  type: "page-type/track",
  slug: "ariana-grande-love-me-harder-love-me-harder-instrumental",
  ownLength: 3.9339,
  ownProgress: 3.9339,
  partOfCollections: ["release/ariana-grande-love-me-harder"],
  status: "completed",
  unit: "unit/minutes",
  title: "Love Me Harder - Instrumental",
  trackType: "instrumental",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "lovemeharderinstrumental|66CXWjxzNUsdJxJ2JdwvnR|236034",
  song: "song/ariana-grande-love-me-harder",
  carriedBy: [
    {
      release: "release/ariana-grande-love-me-harder",
      discNumber: 1,
      position: 3,
      externalId: "5Lrma6e2xfpi8uGBknkQIt",
      externalLink: "https://open.spotify.com/track/5Lrma6e2xfpi8uGBknkQIt",
    },
  ],
} as const satisfies Track
