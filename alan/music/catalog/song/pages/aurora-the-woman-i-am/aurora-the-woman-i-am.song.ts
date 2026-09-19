import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraTheWomanIAm = {
  id: "019ea4a6-7568-7075-ab72-29f5256c8883",
  type: "page-type/song",
  slug: "aurora-the-woman-i-am",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a43eed81-264f-4486-adbb-4c71b82c1148",
      externalLink: "https://musicbrainz.org/work/a43eed81-264f-4486-adbb-4c71b82c1148",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Woman I Am",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
