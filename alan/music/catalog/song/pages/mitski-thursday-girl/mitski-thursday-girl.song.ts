import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiThursdayGirl = {
  id: "019f0ea2-2c86-7beb-a612-a8d426ba6ffb",
  type: "page-type/song",
  slug: "mitski-thursday-girl",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "76cd3d78-2bc5-4e36-9454-0e31e47365d2",
      externalLink: "https://musicbrainz.org/work/76cd3d78-2bc5-4e36-9454-0e31e47365d2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Thursday Girl",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
