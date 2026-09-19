import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorBackOnTheStreetAgain = {
  id: "01a0b72f-2264-7b94-b5c7-eb9a3599c366",
  type: "page-type/song",
  slug: "james-taylor-back-on-the-street-again",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "26e5b272-a85e-4097-8f2a-12d30225a397",
      externalLink: "https://musicbrainz.org/work/26e5b272-a85e-4097-8f2a-12d30225a397",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Back on the Street Again",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
