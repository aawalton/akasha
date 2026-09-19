import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftHysteria = {
  id: "019ea416-2bbd-7418-8c9d-6f99f131cf29",
  type: "page-type/song",
  slug: "taylor-swift-hysteria",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f31e9cdd-1c05-39a8-a694-66e3d54dce46",
      externalLink: "https://musicbrainz.org/work/f31e9cdd-1c05-39a8-a694-66e3d54dce46",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hysteria",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
