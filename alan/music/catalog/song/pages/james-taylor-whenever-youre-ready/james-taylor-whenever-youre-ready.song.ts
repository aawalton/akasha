import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorWheneverYoureReady = {
  id: "01a0b72f-4c00-7d35-a311-1856815589d7",
  type: "page-type/song",
  slug: "james-taylor-whenever-youre-ready",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5128070b-ddad-465c-805c-cad581945ba1",
      externalLink: "https://musicbrainz.org/work/5128070b-ddad-465c-805c-cad581945ba1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Whenever You're Ready",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
} as const satisfies Song
