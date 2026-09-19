import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsPantomime = {
  id: "019ea49b-c777-7ecf-9a97-77d3a7ae4070",
  type: "page-type/song",
  slug: "imagine-dragons-pantomime",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "27f60da9-44ca-46b8-b448-886f0fe98743",
      externalLink: "https://musicbrainz.org/work/27f60da9-44ca-46b8-b448-886f0fe98743",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Pantomime",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
