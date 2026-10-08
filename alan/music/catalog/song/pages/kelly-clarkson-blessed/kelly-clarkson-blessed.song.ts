import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonBlessed = {
  id: "019ea4ae-f49c-72e6-a9bc-8d2455a13b9c",
  type: "page-type/song",
  slug: "kelly-clarkson-blessed",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "79609e14-8e88-4dd9-838c-6948a508f97b",
      externalLink: "https://musicbrainz.org/work/79609e14-8e88-4dd9-838c-6948a508f97b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Blessed",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:43:09.852Z",
  updatedAt: "2026-09-19T16:29:09.000Z",
} as const satisfies Song
