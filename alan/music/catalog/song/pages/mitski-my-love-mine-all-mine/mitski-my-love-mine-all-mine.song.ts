import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiMyLoveMineAllMine = {
  id: "019f0ea5-f219-747c-a237-26086f06f855",
  type: "page-type/song",
  slug: "mitski-my-love-mine-all-mine",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bf93b578-a3cd-4ec0-8900-01f637749d6c",
      externalLink: "https://musicbrainz.org/work/bf93b578-a3cd-4ec0-8900-01f637749d6c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "My Love Mine All Mine",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
