import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonFoolishGames = {
  id: "019ea4af-6185-7a98-a53e-66a56285bd9f",
  type: "page-type/song",
  slug: "kelly-clarkson-foolish-games",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "92d68aa9-64e0-3a10-b90d-d08015403b92",
      externalLink: "https://musicbrainz.org/work/92d68aa9-64e0-3a10-b90d-d08015403b92",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Foolish Games",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
