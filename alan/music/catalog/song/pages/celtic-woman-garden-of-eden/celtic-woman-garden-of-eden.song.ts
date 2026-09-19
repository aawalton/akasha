import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanGardenOfEden = {
  id: "01a0b720-1561-73a7-bb4b-b767929ef614",
  type: "page-type/song",
  slug: "celtic-woman-garden-of-eden",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e44e0bc7-e472-4b0e-954e-add5fa6d8a87",
      externalLink: "https://musicbrainz.org/work/e44e0bc7-e472-4b0e-954e-add5fa6d8a87",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Garden of Eden",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
