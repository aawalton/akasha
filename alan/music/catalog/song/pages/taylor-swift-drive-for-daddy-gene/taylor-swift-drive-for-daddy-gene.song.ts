import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftDriveForDaddyGene = {
  id: "019ea416-0d27-7fa0-8497-967103106f3b",
  type: "page-type/song",
  slug: "taylor-swift-drive-for-daddy-gene",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7cb324a6-9844-45a6-b9f4-c34cc8117a20",
      externalLink: "https://musicbrainz.org/work/7cb324a6-9844-45a6-b9f4-c34cc8117a20",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Drive (For Daddy Gene)",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
