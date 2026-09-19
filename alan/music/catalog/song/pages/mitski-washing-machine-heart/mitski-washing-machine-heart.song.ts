import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiWashingMachineHeart = {
  id: "019f0e9e-675f-728a-aae2-3c630f67d53a",
  type: "page-type/song",
  slug: "mitski-washing-machine-heart",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "32b287d7-c063-432c-8d70-96cde7aa4ae9",
      externalLink: "https://musicbrainz.org/work/32b287d7-c063-432c-8d70-96cde7aa4ae9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Washing Machine Heart",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
