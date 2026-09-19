import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonGrownUpChristmasList = {
  id: "019ea4af-7fbf-70de-b554-b92a8ef98667",
  type: "page-type/song",
  slug: "kelly-clarkson-grown-up-christmas-list",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "98bd7325-3428-4daf-9b86-cce2261fd6e8",
      externalLink: "https://musicbrainz.org/work/98bd7325-3428-4daf-9b86-cce2261fd6e8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Grown Up Christmas List",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
