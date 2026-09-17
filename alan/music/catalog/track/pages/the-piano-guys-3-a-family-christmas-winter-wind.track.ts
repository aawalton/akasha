import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3AFamilyChristmasWinterWind = {
  id: "01a0afa2-185c-7a33-a674-c11a6ae4663b",
  type: "page-type/track",
  slug: "the-piano-guys-3-a-family-christmas-winter-wind",
  ownLength: 4.445416666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-a-family-christmas"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6vp9J0CECnsA3PRxasHhEM",
      externalLink: "https://open.spotify.com/track/6vp9J0CECnsA3PRxasHhEM",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Winter Wind",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "67CqEIMpWuNb6MnpTKjlFv", artistName: "Steven Sharp Nelson" },
    { externalId: "2YQ4MY2VwOMv43C0GemUY5", artistName: "Jon Schmidt" },
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
  ],
  trackKey:
    "winterwind|0jW6R8CVyVohuUJVcuweDI,2YQ4MY2VwOMv43C0GemUY5,67CqEIMpWuNb6MnpTKjlFv|266725",
} as const satisfies Track
