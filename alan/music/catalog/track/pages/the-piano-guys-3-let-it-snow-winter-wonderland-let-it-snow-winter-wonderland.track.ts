import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LetItSnowWinterWonderlandLetItSnowWinterWonderland = {
  id: "01a0afa2-1d21-7a06-ab6c-134cdeb2e8ab",
  type: "page-type/track",
  slug: "the-piano-guys-3-let-it-snow-winter-wonderland-let-it-snow-winter-wonderland",
  ownLength: 3.4038333333333335,
  ownProgress: 3.4038333333333335,
  partOfCollections: ["release/the-piano-guys-3-let-it-snow-winter-wonderland"],
  status: "completed",
  unit: "unit/minutes",
  title: "Let It Snow / Winter Wonderland",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { artistName: "Felix Bernard" },
    { artistName: "Jule Styne" },
    { artist: "artist/the-piano-guys" },
  ],
  trackKey:
    "letitsnowwinterwonderland|0jW6R8CVyVohuUJVcuweDI,3vAPM1qiCuClMH5DNbAgtC,4us59Bx720z6eLFe7FeoEA|204230",
  song: "song/the-piano-guys-let-it-snow-winter-wonderland",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-let-it-snow-winter-wonderland",
      discNumber: 1,
      position: 1,
      externalId: "2J5EfDhLVPKdIgGLTGl32v",
      externalLink: "https://open.spotify.com/track/2J5EfDhLVPKdIgGLTGl32v",
    },
  ],
} as const satisfies Track
