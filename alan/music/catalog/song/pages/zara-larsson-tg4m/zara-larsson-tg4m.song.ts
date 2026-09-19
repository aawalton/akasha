import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonTg4m = {
  id: "019ea49d-b1f9-7075-be67-cb3ac9f0fb27",
  type: "page-type/song",
  slug: "zara-larsson-tg4m",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "07b3567b-c6ee-42de-9b51-ac58cf758f30",
      externalLink: "https://musicbrainz.org/work/07b3567b-c6ee-42de-9b51-ac58cf758f30",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "TG4M",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
