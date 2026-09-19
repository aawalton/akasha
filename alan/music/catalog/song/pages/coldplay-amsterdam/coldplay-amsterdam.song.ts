import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayAmsterdam = {
  id: "01a0ba5d-43e1-744f-a954-03a8a0b65838",
  type: "page-type/song",
  slug: "coldplay-amsterdam",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "aab2608d-0146-3f3b-aea6-72a30673b5f2",
      externalLink: "https://musicbrainz.org/work/aab2608d-0146-3f3b-aea6-72a30673b5f2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Amsterdam",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
