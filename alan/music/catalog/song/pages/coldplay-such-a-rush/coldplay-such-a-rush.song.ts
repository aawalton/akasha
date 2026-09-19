import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplaySuchARush = {
  id: "01a0ba60-fc35-78c5-9114-454353d4aba2",
  type: "page-type/song",
  slug: "coldplay-such-a-rush",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "deda597e-5166-4544-af4b-5f31e78c11bd",
      externalLink: "https://musicbrainz.org/work/deda597e-5166-4544-af4b-5f31e78c11bd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Such a Rush",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
