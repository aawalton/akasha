import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiAHorseNamedColdAir = {
  id: "019f0ea7-3288-7fb6-b83b-caf87d9636a8",
  type: "page-type/song",
  slug: "mitski-a-horse-named-cold-air",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "db387bce-b5d2-4f8e-b4c1-8a193235a420",
      externalLink: "https://musicbrainz.org/work/db387bce-b5d2-4f8e-b4c1-8a193235a420",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Horse Named Cold Air",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
