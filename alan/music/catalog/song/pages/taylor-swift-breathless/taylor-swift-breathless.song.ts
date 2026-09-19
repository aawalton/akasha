import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftBreathless = {
  id: "019ea416-03b1-7c04-a775-ed27a0f31aa3",
  type: "page-type/song",
  slug: "taylor-swift-breathless",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "196407bb-1746-4660-a3f0-37d986f96580",
      externalLink: "https://musicbrainz.org/work/196407bb-1746-4660-a3f0-37d986f96580",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Breathless",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
