import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishCopycat = {
  id: "019ea4a8-df45-70b2-a966-191e360afa98",
  type: "page-type/song",
  slug: "billie-eilish-copycat",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "323d829b-80cb-4c16-89e0-f688b1f5f25c",
      externalLink: "https://musicbrainz.org/work/323d829b-80cb-4c16-89e0-f688b1f5f25c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "COPYCAT",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
