import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonChristmasEve = {
  id: "019ea4ad-84e0-7095-b5b0-3192aaeca1f3",
  type: "page-type/song",
  slug: "kelly-clarkson-christmas-eve",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "337aee3c-6edc-43e6-a28f-c0e0f0237d63",
      externalLink: "https://musicbrainz.org/work/337aee3c-6edc-43e6-a28f-c0e0f0237d63",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Christmas Eve",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
