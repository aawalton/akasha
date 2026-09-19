import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonTheTroubleWithLoveIs = {
  id: "019ea4b2-d77c-7669-b475-adaee4ef5312",
  type: "page-type/song",
  slug: "kelly-clarkson-the-trouble-with-love-is",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8b80440f-101d-4e09-bde4-a1eeeee68485",
      externalLink: "https://musicbrainz.org/work/8b80440f-101d-4e09-bde4-a1eeeee68485",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Trouble With Love Is",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
