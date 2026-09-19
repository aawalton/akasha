import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishMyStrangeAddiction = {
  id: "019ea4aa-cb47-7b4a-8c30-2388ef5bfedf",
  type: "page-type/song",
  slug: "billie-eilish-my-strange-addiction",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9c98d76e-2454-445c-aa8c-3f18cd9fe8c4",
      externalLink: "https://musicbrainz.org/work/9c98d76e-2454-445c-aa8c-3f18cd9fe8c4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "my strange addiction",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
