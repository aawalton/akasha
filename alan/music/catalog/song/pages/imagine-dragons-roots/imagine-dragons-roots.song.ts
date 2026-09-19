import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsRoots = {
  id: "019ea49c-9267-7767-8569-d399c296f331",
  type: "page-type/song",
  slug: "imagine-dragons-roots",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9019a210-b458-4d27-9456-4057d1e95e03",
      externalLink: "https://musicbrainz.org/work/9019a210-b458-4d27-9456-4057d1e95e03",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Roots",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
