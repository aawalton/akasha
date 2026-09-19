import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftIMYours = {
  id: "019ea416-288a-7cf6-8f86-e617ddf8894d",
  type: "page-type/song",
  slug: "taylor-swift-i-m-yours",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ba157f6a-d81c-38f8-8a62-a578426bfdad",
      externalLink: "https://musicbrainz.org/work/ba157f6a-d81c-38f8-8a62-a578426bfdad",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I’m Yours",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
