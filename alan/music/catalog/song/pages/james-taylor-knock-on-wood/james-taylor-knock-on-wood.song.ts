import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorKnockOnWood = {
  id: "01a0b72f-3742-789e-9aec-9ddc5c1d9c7d",
  type: "page-type/song",
  slug: "james-taylor-knock-on-wood",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "58b02872-54a6-3b00-b50c-31422c32a302",
      externalLink: "https://musicbrainz.org/work/58b02872-54a6-3b00-b50c-31422c32a302",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Knock on Wood",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
