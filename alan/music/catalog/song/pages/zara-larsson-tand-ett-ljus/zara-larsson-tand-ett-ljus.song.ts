import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonTandEttLjus = {
  id: "019ea4a0-a549-7f9b-9079-bf0250ff952d",
  type: "page-type/song",
  slug: "zara-larsson-tand-ett-ljus",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9ea121c5-b09d-4396-b7de-0fad1aa96e7e",
      externalLink: "https://musicbrainz.org/work/9ea121c5-b09d-4396-b7de-0fad1aa96e7e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Tänd ett ljus",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
