import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorHeyMisterThatsMeUpOnTheJukebox = {
  id: "01a0b72f-2afb-7c9d-95c4-a36dc4509955",
  type: "page-type/song",
  slug: "james-taylor-hey-mister-thats-me-up-on-the-jukebox",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "aad82a5c-891d-30c5-a6e9-76b7609b2869",
      externalLink: "https://musicbrainz.org/work/aad82a5c-891d-30c5-a6e9-76b7609b2869",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hey Mister, That’s Me Up on the Jukebox",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
