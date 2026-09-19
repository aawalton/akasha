import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LetItSnowWinterWonderlandLetItSnowWinterWonderland = {
  id: "01a0afa2-1d21-7a06-ab6c-134cdeb2e8ab",
  type: "page-type/track",
  slug: "the-piano-guys-3-let-it-snow-winter-wonderland-let-it-snow-winter-wonderland",
  ownLength: 3.4038333333333335,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-let-it-snow-winter-wonderland"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2J5EfDhLVPKdIgGLTGl32v",
      externalLink: "https://open.spotify.com/track/2J5EfDhLVPKdIgGLTGl32v",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Let It Snow / Winter Wonderland",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4us59Bx720z6eLFe7FeoEA", artistName: "Felix Bernard" },
    { externalId: "3vAPM1qiCuClMH5DNbAgtC", artistName: "Jule Styne" },
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
  ],
  trackKey:
    "letitsnowwinterwonderland|0jW6R8CVyVohuUJVcuweDI,3vAPM1qiCuClMH5DNbAgtC,4us59Bx720z6eLFe7FeoEA|204230",
  song: "song/the-piano-guys-let-it-snow-winter-wonderland",
} as const satisfies Track
