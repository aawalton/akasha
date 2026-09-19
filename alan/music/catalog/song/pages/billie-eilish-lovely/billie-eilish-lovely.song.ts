import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishLovely = {
  id: "019ea4aa-3bb4-7653-a11b-783c745aea85",
  type: "page-type/song",
  slug: "billie-eilish-lovely",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "80510c2c-a7a2-48f4-8f98-469f16161851",
      externalLink: "https://musicbrainz.org/work/80510c2c-a7a2-48f4-8f98-469f16161851",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lovely",
  artist: "artist/billie-eilish",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
