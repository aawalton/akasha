import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsSmokeMirrorsTrouble = {
  id: "01a0c43f-d3ac-77ca-9b7a-ba013bace452",
  type: "page-type/track",
  slug: "imagine-dragons-smoke-mirrors-trouble",
  ownLength: 3.19,
  ownProgress: 3.19,
  partOfCollections: ["release/imagine-dragons-smoke-mirrors"],
  position: 10,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7oeeeHdNY8S6zVsU0fuWLr",
      externalLink: "https://open.spotify.com/track/7oeeeHdNY8S6zVsU0fuWLr",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Trouble",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "trouble|53XhwfbYqKCa1cC15pYq2q|191400",
  song: "song/imagine-dragons-trouble",
  carriedBy: [
    {
      release: "release/imagine-dragons-smoke-mirrors",
      discNumber: 1,
      position: 10,
      externalId: "7oeeeHdNY8S6zVsU0fuWLr",
      externalLink: "https://open.spotify.com/track/7oeeeHdNY8S6zVsU0fuWLr",
    },
  ],
} as const satisfies Track
