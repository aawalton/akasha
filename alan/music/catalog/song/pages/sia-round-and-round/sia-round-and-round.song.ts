import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaRoundAndRound = {
  id: "019ea4cd-5dc4-7ff5-abb9-024a8f60f124",
  type: "page-type/song",
  slug: "sia-round-and-round",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9be3e5b4-6c1e-4b93-889d-c89039ac50e9",
      externalLink: "https://musicbrainz.org/work/9be3e5b4-6c1e-4b93-889d-c89039ac50e9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Round and Round",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
