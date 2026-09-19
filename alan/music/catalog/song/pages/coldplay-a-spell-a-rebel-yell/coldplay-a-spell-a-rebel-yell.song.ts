import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayASpellARebelYell = {
  id: "01a0ba5d-3f9a-7a62-a57f-671a5c92aed6",
  type: "page-type/song",
  slug: "coldplay-a-spell-a-rebel-yell",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7a098d95-673c-4939-99e6-1e427631bf4c",
      externalLink: "https://musicbrainz.org/work/7a098d95-673c-4939-99e6-1e427631bf4c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Spell a Rebel Yell",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
