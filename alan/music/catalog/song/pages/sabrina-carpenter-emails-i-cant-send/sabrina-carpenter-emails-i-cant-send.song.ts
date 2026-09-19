import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterEmailsICantSend = {
  id: "01a0b723-ce8e-7230-aeab-70a499f0a595",
  type: "page-type/song",
  slug: "sabrina-carpenter-emails-i-cant-send",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e382786b-7953-46c4-b555-7a076b0f4085",
      externalLink: "https://musicbrainz.org/work/e382786b-7953-46c4-b555-7a076b0f4085",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "emails i can’t send",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
