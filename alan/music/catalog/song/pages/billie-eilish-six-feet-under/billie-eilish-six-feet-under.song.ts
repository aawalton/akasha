import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishSixFeetUnder = {
  id: "019ea4ab-2ed8-7279-bcba-2d66ce01ccad",
  type: "page-type/song",
  slug: "billie-eilish-six-feet-under",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c10c966a-65c9-4e8a-ade7-868d4dade77d",
      externalLink: "https://musicbrainz.org/work/c10c966a-65c9-4e8a-ade7-868d4dade77d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Six Feet Under",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
