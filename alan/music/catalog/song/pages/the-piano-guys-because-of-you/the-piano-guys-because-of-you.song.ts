import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysBecauseOfYou = {
  id: "01a0b71e-9e8c-76e7-93d7-2034b83b1c40",
  type: "page-type/song",
  slug: "the-piano-guys-because-of-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "dc7803db-5579-471e-8876-db26cb81910d",
      externalLink: "https://musicbrainz.org/work/dc7803db-5579-471e-8876-db26cb81910d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Because of You",
  artist: "artist/the-piano-guys",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
