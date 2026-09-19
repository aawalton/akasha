import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorChansonFrancaise = {
  id: "01a0b72f-263e-7d74-bc15-bf66fea94767",
  type: "page-type/song",
  slug: "james-taylor-chanson-francaise",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "69ef0d7c-04d1-4970-b26a-cf784df63442",
      externalLink: "https://musicbrainz.org/work/69ef0d7c-04d1-4970-b26a-cf784df63442",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Chanson Française",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
