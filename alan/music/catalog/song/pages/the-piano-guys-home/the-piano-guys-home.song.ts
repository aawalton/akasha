import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysHome = {
  id: "01a0b71e-9ba7-7b86-be9a-8b0db339344d",
  type: "page-type/song",
  slug: "the-piano-guys-home",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8649b555-c0d9-4575-a2ee-21125ac8a5d4",
      externalLink: "https://musicbrainz.org/work/8649b555-c0d9-4575-a2ee-21125ac8a5d4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Home",
  artist: "artist/the-piano-guys",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
