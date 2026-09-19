import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsIntro = {
  id: "019ea496-f008-7a0c-9f84-b124a84f7d27",
  type: "page-type/song",
  slug: "imagine-dragons-intro",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "16e5a571-ea5a-43d5-aac8-7b9878da3b00",
      externalLink: "https://musicbrainz.org/work/16e5a571-ea5a-43d5-aac8-7b9878da3b00",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Intro",
  artist: "artist/imagine-dragons",
  performed: true,
} as const satisfies Song
