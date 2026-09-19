import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayTalk = {
  id: "01a0ba5d-53ef-7443-8576-ac8427fd79a0",
  type: "page-type/song",
  slug: "coldplay-talk",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "874a58ec-d42b-34dd-b7fd-865b9a359667",
      externalLink: "https://musicbrainz.org/work/874a58ec-d42b-34dd-b7fd-865b9a359667",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Talk",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
