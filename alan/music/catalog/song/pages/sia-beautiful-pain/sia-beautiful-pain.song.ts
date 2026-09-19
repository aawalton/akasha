import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBeautifulPain = {
  id: "019ea4c6-036b-71a2-9c82-bd7c462ef169",
  type: "page-type/song",
  slug: "sia-beautiful-pain",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d81f53d6-d65a-4757-978b-a1de618a11c9",
      externalLink: "https://musicbrainz.org/work/d81f53d6-d65a-4757-978b-a1de618a11c9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Beautiful Pain",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
