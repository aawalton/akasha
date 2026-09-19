import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonRunRunRun = {
  id: "019ea4c1-60d9-79d1-a4ab-ff675f6b24e8",
  type: "page-type/song",
  slug: "kelly-clarkson-run-run-run",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c47af29e-64ad-4d9b-bb52-834e8b11be7d",
      externalLink: "https://musicbrainz.org/work/c47af29e-64ad-4d9b-bb52-834e8b11be7d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Run Run Run",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
