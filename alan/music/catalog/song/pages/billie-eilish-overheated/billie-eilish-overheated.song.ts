import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishOverheated = {
  id: "019ea4a8-58aa-7ac5-8e77-6e1e92014724",
  type: "page-type/song",
  slug: "billie-eilish-overheated",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "08baf83f-789d-4eed-977f-67c193156e7a",
      externalLink: "https://musicbrainz.org/work/08baf83f-789d-4eed-977f-67c193156e7a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "OverHeated",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
