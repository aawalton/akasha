import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsNiceToMeetYou = {
  id: "019ea497-4ef0-7a37-a45e-3e92ff8738b1",
  type: "page-type/song",
  slug: "imagine-dragons-nice-to-meet-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2ce80033-9250-4bbe-923e-0720e9d68322",
      externalLink: "https://musicbrainz.org/work/2ce80033-9250-4bbe-923e-0720e9d68322",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Nice to Meet You",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
