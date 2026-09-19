import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsHandInMyPocket = {
  id: "019ea499-92fd-7296-85e6-f962f9892593",
  type: "page-type/song",
  slug: "imagine-dragons-hand-in-my-pocket",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9223a61c-6464-3e6d-8eeb-9feb63e94c48",
      externalLink: "https://musicbrainz.org/work/9223a61c-6464-3e6d-8eeb-9feb63e94c48",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hand in My Pocket",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
