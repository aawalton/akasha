import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishDontSmileAtMeMyBoy = {
  id: "01a0b638-eb9a-7aa9-9f43-2dd2dc79f419",
  type: "page-type/track",
  slug: "billie-eilish-dont-smile-at-me-my-boy",
  ownLength: 2.8475333333333332,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-dont-smile-at-me"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1RGasjWLZ4qMN7wbtkLa3u",
      externalLink: "https://open.spotify.com/track/1RGasjWLZ4qMN7wbtkLa3u",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "my boy",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "myboy|6qqNVTkY8uBg9cP3Jd7DAH|170852",
  song: "song/billie-eilish-my-boy",
} as const satisfies Track
