import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeBreakUpWithYourGirlfriendIMBored = {
  id: "019ea4e3-4430-731b-b1a3-2d440c1c7984",
  type: "page-type/song",
  slug: "ariana-grande-break-up-with-your-girlfriend-i-m-bored",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d184f522-71c3-43d0-820f-7dbd4998e335",
      externalLink: "https://musicbrainz.org/work/d184f522-71c3-43d0-820f-7dbd4998e335",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "break up with your girlfriend, i’m bored",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
