import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonSober = {
  id: "019ea4b2-a145-772e-8c4a-6e7863a0cfd7",
  type: "page-type/song",
  slug: "kelly-clarkson-sober",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "77c0fd13-1734-483a-ac9e-71c2c1d29108",
      externalLink: "https://musicbrainz.org/work/77c0fd13-1734-483a-ac9e-71c2c1d29108",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sober",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
