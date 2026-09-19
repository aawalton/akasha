import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiSusieSaveYourLove = {
  id: "019f0ea3-1de0-7f52-9f60-55d3f9c14f5f",
  type: "page-type/song",
  slug: "mitski-susie-save-your-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "85e16d1e-fc4a-4e77-8583-d167cc28398d",
      externalLink: "https://musicbrainz.org/work/85e16d1e-fc4a-4e77-8583-d167cc28398d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Susie Save Your Love",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
