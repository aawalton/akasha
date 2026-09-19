import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonCanTHoldBack = {
  id: "019ea4a0-511a-73fb-8008-a4597188f4a9",
  type: "page-type/song",
  slug: "zara-larsson-can-t-hold-back",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8bb6800f-c92c-4512-8571-adde50919af2",
      externalLink: "https://musicbrainz.org/work/8bb6800f-c92c-4512-8571-adde50919af2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Can’t Hold Back",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
