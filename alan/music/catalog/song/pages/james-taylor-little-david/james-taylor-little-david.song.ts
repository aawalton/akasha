import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorLittleDavid = {
  id: "01a0b72f-407c-7ecc-96dc-c6543235a4b6",
  type: "page-type/song",
  slug: "james-taylor-little-david",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c74b3c00-f0c8-4bd9-958f-ab53f155a818",
      externalLink: "https://musicbrainz.org/work/c74b3c00-f0c8-4bd9-958f-ab53f155a818",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Little David",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
