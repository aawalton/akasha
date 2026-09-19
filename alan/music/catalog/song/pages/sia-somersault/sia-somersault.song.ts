import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaSomersault = {
  id: "019ea4cd-3455-7667-9031-4c40f186d188",
  type: "page-type/song",
  slug: "sia-somersault",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9505d156-19e7-4e9c-8f7e-24f8a3dc636d",
      externalLink: "https://musicbrainz.org/work/9505d156-19e7-4e9c-8f7e-24f8a3dc636d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Somersault",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
