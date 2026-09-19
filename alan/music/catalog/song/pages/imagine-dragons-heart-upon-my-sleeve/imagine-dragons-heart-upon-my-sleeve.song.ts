import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsHeartUponMySleeve = {
  id: "019ea49a-25e5-7405-a12d-a5e2bf9a5212",
  type: "page-type/song",
  slug: "imagine-dragons-heart-upon-my-sleeve",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b5b6c46b-7028-4344-949e-5e0e3d2e5695",
      externalLink: "https://musicbrainz.org/work/b5b6c46b-7028-4344-949e-5e0e3d2e5695",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Heart Upon My Sleeve",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
