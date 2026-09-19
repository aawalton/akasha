import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeYouCanTStopTheBeat = {
  id: "019ea4e7-4a13-78e6-9ca5-cb37dfdec652",
  type: "page-type/song",
  slug: "ariana-grande-you-can-t-stop-the-beat",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b3e33d13-b0b1-35fa-b575-b63c75c59599",
      externalLink: "https://musicbrainz.org/work/b3e33d13-b0b1-35fa-b575-b63c75c59599",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You Can’t Stop the Beat",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
