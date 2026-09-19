import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishBuryAFriend = {
  id: "019ea4aa-165e-7ddc-bcfc-8508b790b9e8",
  type: "page-type/song",
  slug: "billie-eilish-bury-a-friend",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6f5d9995-4319-44fc-b008-cb70679fab78",
      externalLink: "https://musicbrainz.org/work/6f5d9995-4319-44fc-b008-cb70679fab78",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "bury a friend",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
