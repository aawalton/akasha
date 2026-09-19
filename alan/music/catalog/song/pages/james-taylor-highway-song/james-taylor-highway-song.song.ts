import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorHighwaySong = {
  id: "01a0b72f-2a19-76cd-9528-5d33e8ab0a33",
  type: "page-type/song",
  slug: "james-taylor-highway-song",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9eec9967-d19f-4f05-a718-66a823efd9d8",
      externalLink: "https://musicbrainz.org/work/9eec9967-d19f-4f05-a718-66a823efd9d8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Highway Song",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
