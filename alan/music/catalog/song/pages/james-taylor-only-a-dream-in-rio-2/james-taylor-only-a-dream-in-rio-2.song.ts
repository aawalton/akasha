import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorOnlyADreamInRio2 = {
  id: "01a0b72f-456a-762c-a9f5-560b62967aef",
  type: "page-type/song",
  slug: "james-taylor-only-a-dream-in-rio-2",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fa53f320-e61c-474c-81f0-556079a17111",
      externalLink: "https://musicbrainz.org/work/fa53f320-e61c-474c-81f0-556079a17111",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Only a Dream in Rio",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
