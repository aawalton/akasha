import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsThief = {
  id: "019ea49b-4cf1-76c8-b165-46e138ceea2f",
  type: "page-type/song",
  slug: "imagine-dragons-thief",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "022e077b-6a41-4821-b439-4cf501218ff4",
      externalLink: "https://musicbrainz.org/work/022e077b-6a41-4821-b439-4cf501218ff4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Thief",
  artist: "artist/imagine-dragons",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
