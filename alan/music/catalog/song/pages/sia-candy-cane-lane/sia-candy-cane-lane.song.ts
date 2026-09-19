import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaCandyCaneLane = {
  id: "019ea4c5-4d49-7bad-9ae0-43507ecebdb1",
  type: "page-type/song",
  slug: "sia-candy-cane-lane",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b26b9781-72e2-43c5-bddd-c9bd142f7281",
      externalLink: "https://musicbrainz.org/work/b26b9781-72e2-43c5-bddd-c9bd142f7281",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Candy Cane Lane",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
