import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishYouShouldSeeMeInACrown = {
  id: "019ea4a9-6baf-77bc-b513-28d0701c131e",
  type: "page-type/song",
  slug: "billie-eilish-you-should-see-me-in-a-crown",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4d7dff61-b858-4a8f-aa09-0de9f2d9ebb4",
      externalLink: "https://musicbrainz.org/work/4d7dff61-b858-4a8f-aa09-0de9f2d9ebb4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "you should see me in a crown",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
