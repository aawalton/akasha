import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraAcrossTheUniverse = {
  id: "019ea4a3-c025-7bca-94a2-faeebad5d81d",
  type: "page-type/song",
  slug: "aurora-across-the-universe",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "236fc506-2afa-3c4c-b5f9-50640c56cd9b",
      externalLink: "https://musicbrainz.org/work/236fc506-2afa-3c4c-b5f9-50640c56cd9b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Across the Universe",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
