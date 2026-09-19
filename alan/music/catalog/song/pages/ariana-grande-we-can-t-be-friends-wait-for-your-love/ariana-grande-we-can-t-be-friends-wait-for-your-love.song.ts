import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeWeCanTBeFriendsWaitForYourLove = {
  id: "019ea4e4-d144-77f6-b81b-86f82549ec16",
  type: "page-type/song",
  slug: "ariana-grande-we-can-t-be-friends-wait-for-your-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "44fcf2e3-bb28-4d36-96a0-d9922bce5bea",
      externalLink: "https://musicbrainz.org/work/44fcf2e3-bb28-4d36-96a0-d9922bce5bea",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "we can’t be friends (wait for your love)",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
