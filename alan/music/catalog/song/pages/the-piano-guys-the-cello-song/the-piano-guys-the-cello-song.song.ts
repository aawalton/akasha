import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysTheCelloSong = {
  id: "01a0b71e-9b3c-7732-bcb0-38addd4b9269",
  type: "page-type/song",
  slug: "the-piano-guys-the-cello-song",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7a6a1b21-435f-405d-9115-c07209a336ed",
      externalLink: "https://musicbrainz.org/work/7a6a1b21-435f-405d-9115-c07209a336ed",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Cello Song",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
