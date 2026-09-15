import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiEveryone = {
  id: "019f0e9f-8f71-7386-867a-bba9bd0a9e64",
  type: "song",
  slug: "mitski-everyone",
  title: "Everyone",
  artist: "artist/mitski",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "440f7d3e-8304-4a8c-acf9-4d97fbb52328",
      externalLink: "https://musicbrainz.org/work/440f7d3e-8304-4a8c-acf9-4d97fbb52328",
      lastSyncedAt: "2026-06-28",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
