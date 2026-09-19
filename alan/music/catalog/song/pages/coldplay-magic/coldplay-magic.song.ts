import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayMagic = {
  id: "01a0ba60-fcfd-7f04-943e-d233bc0a9f7d",
  type: "page-type/song",
  slug: "coldplay-magic",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e6cc3aa9-cc6e-424c-a835-f8b9afafe8f7",
      externalLink: "https://musicbrainz.org/work/e6cc3aa9-cc6e-424c-a835-f8b9afafe8f7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Magic",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
