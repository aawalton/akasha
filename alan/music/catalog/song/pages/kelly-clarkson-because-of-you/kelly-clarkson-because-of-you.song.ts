import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonBecauseOfYou = {
  id: "019ea4b0-629d-7d14-875b-8b92824532b7",
  type: "page-type/song",
  slug: "kelly-clarkson-because-of-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d34e2b1a-f29b-3e55-aa52-545846dae40e",
      externalLink: "https://musicbrainz.org/work/d34e2b1a-f29b-3e55-aa52-545846dae40e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Because of You",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
