import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraThankU = {
  id: "019ea4a4-50ed-77b9-9dba-05d170016599",
  type: "page-type/song",
  slug: "aurora-thank-u",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3f7a0082-90c1-3904-80b1-299b5e939336",
      externalLink: "https://musicbrainz.org/work/3f7a0082-90c1-3904-80b1-299b5e939336",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Thank U",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
