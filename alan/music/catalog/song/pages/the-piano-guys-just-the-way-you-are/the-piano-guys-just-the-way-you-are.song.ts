import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysJustTheWayYouAre = {
  id: "01a0b71e-9d73-73de-8cec-2c238a7a411a",
  type: "page-type/song",
  slug: "the-piano-guys-just-the-way-you-are",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "cc193a0c-e710-35fd-90d9-701083a1be35",
      externalLink: "https://musicbrainz.org/work/cc193a0c-e710-35fd-90d9-701083a1be35",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Just the Way You Are",
  artist: "artist/the-piano-guys",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
