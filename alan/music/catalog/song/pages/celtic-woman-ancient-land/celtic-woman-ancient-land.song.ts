import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanAncientLand = {
  id: "01a0b720-08bb-7e59-be57-17fb8bb85afa",
  type: "page-type/song",
  slug: "celtic-woman-ancient-land",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1d3aa355-99b5-4df2-acd7-124c287cb7f9",
      externalLink: "https://musicbrainz.org/work/1d3aa355-99b5-4df2-acd7-124c287cb7f9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ancient Land",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
