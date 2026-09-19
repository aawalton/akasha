import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallOHolyNight = {
  id: "01a0b71d-3a26-7382-a012-e29ba07fdfef",
  type: "page-type/song",
  slug: "paul-cardall-o-holy-night",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "368a7dea-3e18-4d46-86f9-3c31c5cb55a1",
      externalLink: "https://musicbrainz.org/work/368a7dea-3e18-4d46-86f9-3c31c5cb55a1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "O Holy Night",
  artist: "artist/paul-cardall",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
