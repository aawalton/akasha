import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraTheForbiddenFruitsOfEden = {
  id: "019ea4a6-bff8-7fda-98ac-33f9e581a096",
  type: "page-type/song",
  slug: "aurora-the-forbidden-fruits-of-eden",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b9c28777-3d3f-4d19-beed-6775d1e7d117",
      externalLink: "https://musicbrainz.org/work/b9c28777-3d3f-4d19-beed-6775d1e7d117",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Forbidden Fruits of Eden",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
