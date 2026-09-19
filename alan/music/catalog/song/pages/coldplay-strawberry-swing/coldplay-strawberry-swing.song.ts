import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayStrawberrySwing = {
  id: "01a0ba5d-5148-7fa4-a177-dd408b16b9bd",
  type: "page-type/song",
  slug: "coldplay-strawberry-swing",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5b483ee4-f1a1-398c-a32b-39043413bda1",
      externalLink: "https://musicbrainz.org/work/5b483ee4-f1a1-398c-a32b-39043413bda1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Strawberry Swing",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
