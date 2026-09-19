import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonBreakaway = {
  id: "019ea4ad-52c3-783f-af12-f9280ca5f5db",
  type: "page-type/song",
  slug: "kelly-clarkson-breakaway",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2701fa8d-033c-31d5-a65a-4641b1a20455",
      externalLink: "https://musicbrainz.org/work/2701fa8d-033c-31d5-a65a-4641b1a20455",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Breakaway",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
