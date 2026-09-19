import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsZero = {
  id: "019ea49c-334d-7149-991e-dbfc0e3f406e",
  type: "page-type/song",
  slug: "imagine-dragons-zero",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "62a50c26-dad1-4ff5-9058-489c28b1b743",
      externalLink: "https://musicbrainz.org/work/62a50c26-dad1-4ff5-9058-489c28b1b743",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Zero",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
