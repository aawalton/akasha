import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishIlomilo = {
  id: "019ea4aa-1cf0-7ad2-80c7-5e3488602093",
  type: "page-type/song",
  slug: "billie-eilish-ilomilo",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "79df5dad-8c17-41c4-b706-5fe5c9b6c9c3",
      externalLink: "https://musicbrainz.org/work/79df5dad-8c17-41c4-b706-5fe5c9b6c9c3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "ilomilo",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
