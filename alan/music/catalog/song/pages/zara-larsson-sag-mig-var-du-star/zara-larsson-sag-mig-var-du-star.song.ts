import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonSagMigVarDuStar = {
  id: "019ea49d-a8e6-7df8-9475-aaaa6fde54f4",
  type: "page-type/song",
  slug: "zara-larsson-sag-mig-var-du-star",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "06b18012-eb08-415b-bea8-14454a3684a2",
      externalLink: "https://musicbrainz.org/work/06b18012-eb08-415b-bea8-14454a3684a2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Säg mig var du står",
  artist: "artist/zara-larsson",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
