import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiWife = {
  id: "019f0ea6-f214-7510-ba04-878444687472",
  type: "page-type/song",
  slug: "mitski-wife",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d97c0d4e-c96e-455b-9a51-cd3650ff8272",
      externalLink: "https://musicbrainz.org/work/d97c0d4e-c96e-455b-9a51-cd3650ff8272",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Wife",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
