import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraATemporaryHigh = {
  id: "019ea4a2-f762-7497-a290-0679408dd66d",
  type: "page-type/song",
  slug: "aurora-a-temporary-high",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0497b490-20e9-4cd6-b998-4f25ed12ed19",
      externalLink: "https://musicbrainz.org/work/0497b490-20e9-4cd6-b998-4f25ed12ed19",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Temporary High",
  artist: "artist/aurora",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
