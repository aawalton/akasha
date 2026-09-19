import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanWhenYouBelieve = {
  id: "01a0b720-1669-78be-af78-d356a085855c",
  type: "page-type/song",
  slug: "celtic-woman-when-you-believe",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fdb60be2-5d46-37e0-8822-d69b0425c9ef",
      externalLink: "https://musicbrainz.org/work/fdb60be2-5d46-37e0-8822-d69b0425c9ef",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "When You Believe",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
