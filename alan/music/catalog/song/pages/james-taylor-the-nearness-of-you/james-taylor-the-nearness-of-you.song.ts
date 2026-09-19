import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorTheNearnessOfYou = {
  id: "01a0b72f-4e70-7c2b-9a69-17f02d095cf5",
  type: "page-type/song",
  slug: "james-taylor-the-nearness-of-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7d58c995-4c13-3e6f-a57d-6a617688d4e1",
      externalLink: "https://musicbrainz.org/work/7d58c995-4c13-3e6f-a57d-6a617688d4e1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Nearness of You",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
