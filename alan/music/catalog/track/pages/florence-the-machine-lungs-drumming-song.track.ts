import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const florenceTheMachineLungsDrummingSong = {
  id: "01a0a5cd-7269-7f8b-8397-e5e6475933cb",
  type: "page-type/track",
  slug: "florence-the-machine-lungs-drumming-song",
  ownLength: 3.7304333333333335,
  ownProgress: 0,
  partOfCollections: ["release/florence-the-machine-lungs"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "379cCz9KkUvE1iR0OEBDEN",
      externalLink: "https://open.spotify.com/track/379cCz9KkUvE1iR0OEBDEN",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Drumming Song",
} as const satisfies Track
