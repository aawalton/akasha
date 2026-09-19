import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayTilKingdomCome = {
  id: "01a0ba5d-4e31-766c-844a-bca90da07fa2",
  type: "page-type/song",
  slug: "coldplay-til-kingdom-come",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "382f1d68-7465-38c4-91b2-e020cc8cba10",
      externalLink: "https://musicbrainz.org/work/382f1d68-7465-38c4-91b2-e020cc8cba10",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Til Kingdom Come",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
