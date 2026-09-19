import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiBagOfBones = {
  id: "019f0ea0-b4c0-73df-bcaa-a68d653fdaf0",
  type: "page-type/song",
  slug: "mitski-bag-of-bones",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "587bc1b8-5d9e-4c83-973f-781791198394",
      externalLink: "https://musicbrainz.org/work/587bc1b8-5d9e-4c83-973f-781791198394",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bag of Bones",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
