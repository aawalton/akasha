import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorIveGotToStopThinkinBoutThat = {
  id: "01a0b72f-1ff3-766b-801e-06556909b37f",
  type: "page-type/song",
  slug: "james-taylor-ive-got-to-stop-thinkin-bout-that",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0bab27e9-4d5e-46a6-bbfb-40551155d5ef",
      externalLink: "https://musicbrainz.org/work/0bab27e9-4d5e-46a6-bbfb-40551155d5ef",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "(I’ve Got To) Stop Thinkin’ ’bout That",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
