import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const siaOhFather = {
  id: "019ea4c6-f1a2-7ce9-9467-fd603a3711b0",
  type: "song",
  slug: "sia-oh-father",
  title: "Oh Father",
  artist: "sia",
  externalId: "13d6fd5e-86d7-3fd5-93c4-cd4845f3611f",
  externalLink: "https://musicbrainz.org/work/13d6fd5e-86d7-3fd5-93c4-cd4845f3611f",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
