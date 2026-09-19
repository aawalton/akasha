import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonLetYourTearsFall = {
  id: "01a0ba7f-a105-7162-8cd1-c22e114fe968",
  type: "page-type/song",
  slug: "kelly-clarkson-let-your-tears-fall",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4a2cd499-933c-4595-9bc5-8f8c6d048bb5",
      externalLink: "https://musicbrainz.org/work/4a2cd499-933c-4595-9bc5-8f8c6d048bb5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Let Your Tears Fall",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
