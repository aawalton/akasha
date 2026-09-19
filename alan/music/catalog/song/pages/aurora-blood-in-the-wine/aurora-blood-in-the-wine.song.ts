import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraBloodInTheWine = {
  id: "019ea4a5-8cc9-7a02-8ee4-ea9769322aca",
  type: "page-type/song",
  slug: "aurora-blood-in-the-wine",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "64b9d85a-90ed-4758-a3bc-277421c54d75",
      externalLink: "https://musicbrainz.org/work/64b9d85a-90ed-4758-a3bc-277421c54d75",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Blood in the Wine",
  artist: "artist/aurora",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
