import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiFireworks = {
  id: "019f0ea4-cad6-7cd3-9b04-050d0f2f7dda",
  type: "page-type/song",
  slug: "mitski-fireworks",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ae0adb27-8f05-4bbc-b10c-0aa993c7e70d",
      externalLink: "https://musicbrainz.org/work/ae0adb27-8f05-4bbc-b10c-0aa993c7e70d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fireworks",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
