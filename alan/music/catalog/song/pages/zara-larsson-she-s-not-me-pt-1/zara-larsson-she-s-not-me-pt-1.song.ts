import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonSheSNotMePt1 = {
  id: "019ea4a0-ffbe-7702-9155-78a8046f46f1",
  type: "page-type/song",
  slug: "zara-larsson-she-s-not-me-pt-1",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b4759de9-725a-4ab4-9eb2-6d5b113c41f6",
      externalLink: "https://musicbrainz.org/work/b4759de9-725a-4ab4-9eb2-6d5b113c41f6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "She's Not Me, Pt. 1",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
