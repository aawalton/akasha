import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorForFree = {
  id: "01a0b72f-3098-78fe-a1ff-287c1291fd45",
  type: "page-type/song",
  slug: "james-taylor-for-free",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e854b4cb-abdb-363b-9052-1a2351bb7e8a",
      externalLink: "https://musicbrainz.org/work/e854b4cb-abdb-363b-9052-1a2351bb7e8a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "For Free",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
