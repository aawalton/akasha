import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysWithoutYou = {
  id: "01a0b71e-9925-7148-bd71-7b015ab8a10c",
  type: "page-type/song",
  slug: "the-piano-guys-without-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2c019daa-2a15-4317-b241-0e0fd83cd02d",
      externalLink: "https://musicbrainz.org/work/2c019daa-2a15-4317-b241-0e0fd83cd02d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Without You",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
