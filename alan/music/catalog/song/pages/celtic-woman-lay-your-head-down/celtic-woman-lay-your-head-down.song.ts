import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanLayYourHeadDown = {
  id: "01a0b720-0d33-7869-baf4-9c0398fa177b",
  type: "page-type/song",
  slug: "celtic-woman-lay-your-head-down",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5e0c1b0d-8f68-4744-bb15-80ed470f9768",
      externalLink: "https://musicbrainz.org/work/5e0c1b0d-8f68-4744-bb15-80ed470f9768",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lay Your Head Down",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
