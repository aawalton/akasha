import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorDayTripper = {
  id: "01a0b72f-2a99-7636-908a-0b71415d5b7b",
  type: "page-type/song",
  slug: "james-taylor-day-tripper",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a48b1cf5-345e-37a5-aac3-10b1e1b9b69b",
      externalLink: "https://musicbrainz.org/work/a48b1cf5-345e-37a5-aac3-10b1e1b9b69b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Day Tripper",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
