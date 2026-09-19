import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayCrestsOfWaves = {
  id: "01a0ba5d-42b3-7b2c-a259-5e41d0555eec",
  type: "page-type/song",
  slug: "coldplay-crests-of-waves",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9653d256-27c5-4bc2-be01-cab3d314463f",
      externalLink: "https://musicbrainz.org/work/9653d256-27c5-4bc2-be01-cab3d314463f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Crests of Waves",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
