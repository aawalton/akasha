import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanScarboroughFair = {
  id: "01a0b720-1357-77c7-b910-2489859264a7",
  type: "page-type/song",
  slug: "celtic-woman-scarborough-fair",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c08f47ec-839e-3f84-822c-017ad5f4918f",
      externalLink: "https://musicbrainz.org/work/c08f47ec-839e-3f84-822c-017ad5f4918f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Scarborough Fair",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T00:45:27.767Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
