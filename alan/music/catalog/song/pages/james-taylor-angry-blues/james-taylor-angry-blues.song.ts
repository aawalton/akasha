import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorAngryBlues = {
  id: "01a0b72f-2063-704f-b734-8e9acc159a73",
  type: "page-type/song",
  slug: "james-taylor-angry-blues",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0efa17cd-d0e8-4489-9a00-295e485aaab2",
      externalLink: "https://musicbrainz.org/work/0efa17cd-d0e8-4489-9a00-295e485aaab2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Angry Blues",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
