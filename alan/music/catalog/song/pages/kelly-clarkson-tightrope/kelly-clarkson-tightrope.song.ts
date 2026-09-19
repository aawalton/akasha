import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonTightrope = {
  id: "019ea4b2-7525-76e9-8c14-f93095f3fa9d",
  type: "page-type/song",
  slug: "kelly-clarkson-tightrope",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6c3de7ea-e7e0-4d4f-9e3f-acdea69f5e62",
      externalLink: "https://musicbrainz.org/work/6c3de7ea-e7e0-4d4f-9e3f-acdea69f5e62",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Tightrope",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
