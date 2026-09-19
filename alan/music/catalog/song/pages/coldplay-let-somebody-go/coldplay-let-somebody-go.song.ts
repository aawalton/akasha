import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayLetSomebodyGo = {
  id: "01a0ba60-fa67-7d32-b7e8-622e7a53c7db",
  type: "page-type/song",
  slug: "coldplay-let-somebody-go",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c490a55e-ad36-476b-9a87-654073a6ed53",
      externalLink: "https://musicbrainz.org/work/c490a55e-ad36-476b-9a87-654073a6ed53",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Let Somebody Go",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
