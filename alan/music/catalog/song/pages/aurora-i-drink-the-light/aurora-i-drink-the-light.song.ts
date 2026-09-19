import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraIDrinkTheLight = {
  id: "019ea4a5-2837-7eb8-9719-9a665c4a9c87",
  type: "page-type/song",
  slug: "aurora-i-drink-the-light",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "56aad9c7-0460-4d78-80f6-274a4d9569c0",
      externalLink: "https://musicbrainz.org/work/56aad9c7-0460-4d78-80f6-274a4d9569c0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I DRINK THE LIGHT",
  artist: "artist/aurora",
  songType: "original",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
