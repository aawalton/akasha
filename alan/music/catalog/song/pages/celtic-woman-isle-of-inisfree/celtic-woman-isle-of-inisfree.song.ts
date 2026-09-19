import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanIsleOfInisfree = {
  id: "01a0b720-10a0-7f66-9902-0e11a43e7ea0",
  type: "page-type/song",
  slug: "celtic-woman-isle-of-inisfree",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "91e69131-0863-334f-917f-b3f1ef9f4ee9",
      externalLink: "https://musicbrainz.org/work/91e69131-0863-334f-917f-b3f1ef9f4ee9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Isle of Inisfree",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
