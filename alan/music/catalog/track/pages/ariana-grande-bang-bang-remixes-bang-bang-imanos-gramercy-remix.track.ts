import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeBangBangRemixesBangBangImanosGramercyRemix = {
  id: "01a0a6c5-3bd8-7f70-8b1d-a4d51324d2b1",
  type: "page-type/track",
  slug: "ariana-grande-bang-bang-remixes-bang-bang-imanos-gramercy-remix",
  ownLength: 3.744666666666667,
  ownProgress: 3.744666666666667,
  partOfCollections: ["release/ariana-grande-bang-bang-remixes"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1z3Q0Vv26kdsSc8KshjNWX",
      externalLink: "https://open.spotify.com/track/1z3Q0Vv26kdsSc8KshjNWX",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Bang Bang - Imanos & Gramercy Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [
    { externalId: "2gsggkzM5R49q6jpPvazou", artistName: "Jessie J" },
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "0hCNtLu0JehylgoiP8L4Gh", artistName: "Nicki Minaj" },
    { externalId: "26fsavNxrXVdRK7wL3jZKb", artistName: "Imanos" },
    { externalId: "6sTJFsZUkAAeoyLOlXkSof", artistName: "Gramercy" },
  ],
  trackKey:
    "bangbangimanosgramercyremix|0hCNtLu0JehylgoiP8L4Gh,26fsavNxrXVdRK7wL3jZKb,2gsggkzM5R49q6jpPvazou,66CXWjxzNUsdJxJ2JdwvnR,6sTJFsZUkAAeoyLOlXkSof|224680",
  song: "song/ariana-grande-bang-bang",
  carriedBy: [
    {
      release: "release/ariana-grande-bang-bang-remixes",
      discNumber: 1,
      position: 4,
      externalId: "1z3Q0Vv26kdsSc8KshjNWX",
      externalLink: "https://open.spotify.com/track/1z3Q0Vv26kdsSc8KshjNWX",
    },
  ],
} as const satisfies Track
