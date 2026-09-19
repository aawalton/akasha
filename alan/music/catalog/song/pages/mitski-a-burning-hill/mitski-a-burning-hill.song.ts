import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiABurningHill = {
  id: "019f0ea1-ac8e-7c96-b95d-b8386e42da68",
  type: "page-type/song",
  slug: "mitski-a-burning-hill",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "70aa45fb-3024-42d7-ba46-031a7778d435",
      externalLink: "https://musicbrainz.org/work/70aa45fb-3024-42d7-ba46-031a7778d435",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Burning Hill",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
