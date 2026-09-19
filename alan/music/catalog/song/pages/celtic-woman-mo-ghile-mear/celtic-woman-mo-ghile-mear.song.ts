import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanMoGhileMear = {
  id: "01a0b720-0814-7e79-a955-26c94e535b82",
  type: "page-type/song",
  slug: "celtic-woman-mo-ghile-mear",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "18b07db1-006c-4994-9bef-beaa320140b4",
      externalLink: "https://musicbrainz.org/work/18b07db1-006c-4994-9bef-beaa320140b4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Mo Ghile Mear",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
