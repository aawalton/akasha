import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHotlineEditHotlineEdit = {
  id: "01a0b638-e8ae-7abd-bd9c-ffcf709066db",
  type: "page-type/track",
  slug: "billie-eilish-hotline-edit-hotline-edit",
  ownLength: 1.0119833333333332,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-hotline-edit"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0WFryfbNKPXVtVQlz5dZ8H",
      externalLink: "https://open.spotify.com/track/0WFryfbNKPXVtVQlz5dZ8H",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "hotline (edit)",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "hotlineedit|6qqNVTkY8uBg9cP3Jd7DAH|60719",
  song: "song/billie-eilish-hotline",
} as const satisfies Track
