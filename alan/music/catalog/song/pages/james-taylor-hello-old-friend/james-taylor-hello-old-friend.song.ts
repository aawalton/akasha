import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorHelloOldFriend = {
  id: "01a0b72f-238c-76ae-8a5e-6cde45aaafa4",
  type: "page-type/song",
  slug: "james-taylor-hello-old-friend",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3b03fcb6-facc-43e4-9abf-a061aa74f549",
      externalLink: "https://musicbrainz.org/work/3b03fcb6-facc-43e4-9abf-a061aa74f549",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hello Old Friend",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
