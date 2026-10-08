import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiRememberMyName = {
  id: "019f0ea6-9648-7127-9dac-a4d4f85fab5c",
  type: "page-type/song",
  slug: "mitski-remember-my-name",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "cc77f879-2c1f-450e-ab95-a7c1726de303",
      externalLink: "https://musicbrainz.org/work/cc77f879-2c1f-450e-ab95-a7c1726de303",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Remember My Name",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-28T14:33:46.312Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
