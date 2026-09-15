import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonBlessed = {
  id: "019ea4ae-f49c-72e6-a9bc-8d2455a13b9c",
  type: "song",
  slug: "kelly-clarkson-blessed",
  title: "Blessed",
  artist: "artist/kelly-clarkson",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "79609e14-8e88-4dd9-838c-6948a508f97b",
      externalLink: "https://musicbrainz.org/work/79609e14-8e88-4dd9-838c-6948a508f97b",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
