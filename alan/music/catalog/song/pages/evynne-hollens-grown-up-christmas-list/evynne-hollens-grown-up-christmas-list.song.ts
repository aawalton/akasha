import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const evynneHollensGrownUpChristmasList = {
  id: "019ea4af-76ea-7964-b5b3-e0fbdc4d5cd8",
  type: "page-type/song",
  slug: "evynne-hollens-grown-up-christmas-list",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9562daba-ddba-4ee4-bd98-2178c61eba6a",
      externalLink: "https://musicbrainz.org/work/9562daba-ddba-4ee4-bd98-2178c61eba6a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Grown‐Up Christmas List",
  artist: "artist/evynne-hollens",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
