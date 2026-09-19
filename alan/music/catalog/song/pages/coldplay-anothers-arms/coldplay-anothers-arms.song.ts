import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayAnothersArms = {
  id: "01a0ba5d-3be8-70c7-9a7b-1654c26fe31c",
  type: "page-type/song",
  slug: "coldplay-anothers-arms",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3c08977f-5041-4fc4-bc90-6c7cad69f131",
      externalLink: "https://musicbrainz.org/work/3c08977f-5041-4fc4-bc90-6c7cad69f131",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Another’s Arms",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
