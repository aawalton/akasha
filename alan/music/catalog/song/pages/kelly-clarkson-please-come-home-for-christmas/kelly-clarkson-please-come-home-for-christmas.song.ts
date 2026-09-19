import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonPleaseComeHomeForChristmas = {
  id: "019ea4c0-ebc6-7db5-8415-c437aaf0ec37",
  type: "page-type/song",
  slug: "kelly-clarkson-please-come-home-for-christmas",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a2d0bf57-8174-32d1-9493-e6fdd125e559",
      externalLink: "https://musicbrainz.org/work/a2d0bf57-8174-32d1-9493-e6fdd125e559",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Please Come Home for Christmas",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
