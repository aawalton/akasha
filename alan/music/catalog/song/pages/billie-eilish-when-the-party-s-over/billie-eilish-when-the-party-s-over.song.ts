import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishWhenThePartySOver = {
  id: "019ea4ab-8b1c-743c-971f-3a5272b3b7c7",
  type: "page-type/song",
  slug: "billie-eilish-when-the-party-s-over",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d8b3a1df-c7a0-4e58-8c31-f8a88c6f96bb",
      externalLink: "https://musicbrainz.org/work/d8b3a1df-c7a0-4e58-8c31-f8a88c6f96bb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "when the party’s over",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
