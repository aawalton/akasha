import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysSummerJam = {
  id: "01a0b71e-9e4e-7d31-aa43-464d64ea6d7b",
  type: "page-type/song",
  slug: "the-piano-guys-summer-jam",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d4532c6f-911e-4df1-9602-6babad1aa14c",
      externalLink: "https://musicbrainz.org/work/d4532c6f-911e-4df1-9602-6babad1aa14c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Summer Jam",
  artist: "artist/the-piano-guys",
  songType: "derivative",
  performed: true,
} as const satisfies Song
