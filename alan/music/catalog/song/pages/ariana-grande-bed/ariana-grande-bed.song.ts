import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeBed = {
  id: "019ea4e0-89ad-733c-be5a-9ccb9261f9d3",
  type: "page-type/song",
  slug: "ariana-grande-bed",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "137813bf-29be-46e9-897c-1a6eb358818a",
      externalLink: "https://musicbrainz.org/work/137813bf-29be-46e9-897c-1a6eb358818a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bed",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
