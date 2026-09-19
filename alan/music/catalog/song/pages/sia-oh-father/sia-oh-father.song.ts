import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaOhFather = {
  id: "019ea4c6-f1a2-7ce9-9467-fd603a3711b0",
  type: "page-type/song",
  slug: "sia-oh-father",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "13d6fd5e-86d7-3fd5-93c4-cd4845f3611f",
      externalLink: "https://musicbrainz.org/work/13d6fd5e-86d7-3fd5-93c4-cd4845f3611f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Oh Father",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
