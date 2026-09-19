import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsYoungDumbBroke = {
  id: "019ea49b-5513-7f05-beb9-f22da472b4ac",
  type: "page-type/song",
  slug: "imagine-dragons-young-dumb-broke",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "079f2bac-f5ce-41e8-be94-82a08b80a535",
      externalLink: "https://musicbrainz.org/work/079f2bac-f5ce-41e8-be94-82a08b80a535",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Young, Dumb & Broke",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
