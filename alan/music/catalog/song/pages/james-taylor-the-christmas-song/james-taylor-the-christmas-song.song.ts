import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorTheChristmasSong = {
  id: "01a0b72f-45c9-7cbd-90b2-30f0b91d2271",
  type: "page-type/song",
  slug: "james-taylor-the-christmas-song",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "00324746-fc24-337b-a9fb-edb8a317be5b",
      externalLink: "https://musicbrainz.org/work/00324746-fc24-337b-a9fb-edb8a317be5b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Christmas Song",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
