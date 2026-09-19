import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishWhenIWasOlder = {
  id: "019ea4a9-bf31-76bc-ae38-459db8582a67",
  type: "page-type/song",
  slug: "billie-eilish-when-i-was-older",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "62f538a4-8c6f-4556-b908-52d539754169",
      externalLink: "https://musicbrainz.org/work/62f538a4-8c6f-4556-b908-52d539754169",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "WHEN I WAS OLDER",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
