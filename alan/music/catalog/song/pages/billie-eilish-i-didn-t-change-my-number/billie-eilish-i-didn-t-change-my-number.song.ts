import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishIDidnTChangeMyNumber = {
  id: "019ea4aa-ef04-7405-9aea-8adacc20fc31",
  type: "page-type/song",
  slug: "billie-eilish-i-didn-t-change-my-number",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ac61a0fa-3546-4eba-bf40-777b1a692906",
      externalLink: "https://musicbrainz.org/work/ac61a0fa-3546-4eba-bf40-777b1a692906",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Didn’t Change My Number",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
