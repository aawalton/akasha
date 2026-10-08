import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsAmerica = {
  id: "019ea499-b56b-72be-81dd-ff0b73b5eb1a",
  type: "page-type/song",
  slug: "imagine-dragons-america",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "99c47346-1144-4b5e-9415-138c7335d948",
      externalLink: "https://musicbrainz.org/work/99c47346-1144-4b5e-9415-138c7335d948",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "America",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:19:57.419Z",
  updatedAt: "2026-09-19T16:40:46.000Z",
} as const satisfies Song
