import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsDullKnives = {
  id: "019ea499-6233-73b2-b6eb-c7055469ce8c",
  type: "page-type/song",
  slug: "imagine-dragons-dull-knives",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "87cc4222-363b-4332-b75c-1fe255aed685",
      externalLink: "https://musicbrainz.org/work/87cc4222-363b-4332-b75c-1fe255aed685",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Dull Knives",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
