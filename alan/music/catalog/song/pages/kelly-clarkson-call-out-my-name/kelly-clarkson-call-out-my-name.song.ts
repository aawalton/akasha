import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonCallOutMyName = {
  id: "019ea4af-0a0a-7ffa-b3e8-f8bda17166a9",
  type: "page-type/song",
  slug: "kelly-clarkson-call-out-my-name",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7ba9ac29-3de4-4481-89ca-501e4575138d",
      externalLink: "https://musicbrainz.org/work/7ba9ac29-3de4-4481-89ca-501e4575138d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Call Out My Name",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
