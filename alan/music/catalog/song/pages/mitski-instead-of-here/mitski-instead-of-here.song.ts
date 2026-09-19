import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiInsteadOfHere = {
  id: "019f0ea4-8561-7cbf-b40a-c2038600bac2",
  type: "page-type/song",
  slug: "mitski-instead-of-here",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a398bae6-4d74-4ff0-8eed-8026b337bc3c",
      externalLink: "https://musicbrainz.org/work/a398bae6-4d74-4ff0-8eed-8026b337bc3c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Instead of Here",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
