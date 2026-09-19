import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3AFamilyChristmasLetItSnowWinterWonderland = {
  id: "01a0afa2-17b3-7fd4-9284-2a654472d6ce",
  type: "page-type/track",
  slug: "the-piano-guys-3-a-family-christmas-let-it-snow-winter-wonderland",
  ownLength: 3.4806333333333335,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-a-family-christmas"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7h8WFgo7wjWVlEA3PxaFa5",
      externalLink: "https://open.spotify.com/track/7h8WFgo7wjWVlEA3PxaFa5",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Let It Snow / Winter Wonderland",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4us59Bx720z6eLFe7FeoEA", artistName: "Felix Bernard" },
    { externalId: "6JvUOG4JFmgNW6jjwm71uU", artistName: "Sammy Cahn" },
    { externalId: "3vAPM1qiCuClMH5DNbAgtC", artistName: "Jule Styne" },
    { externalId: "1OfAveO4qZ0tTDBqEzFwuf", artistName: "Richard B. Smith" },
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
  ],
  trackKey:
    "letitsnowwinterwonderland|0jW6R8CVyVohuUJVcuweDI,1OfAveO4qZ0tTDBqEzFwuf,3vAPM1qiCuClMH5DNbAgtC,4us59Bx720z6eLFe7FeoEA,6JvUOG4JFmgNW6jjwm71uU|208838",
  song: "song/the-piano-guys-let-it-snow-winter-wonderland",
} as const satisfies Track
