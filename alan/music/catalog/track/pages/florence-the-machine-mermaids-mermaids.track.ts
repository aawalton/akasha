import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const florenceTheMachineMermaidsMermaids = {
  id: "01a0a5cd-794c-7f34-886f-60df594cf794",
  type: "page-type/track",
  slug: "florence-the-machine-mermaids-mermaids",
  ownLength: 4.58865,
  ownProgress: 0,
  partOfCollections: ["release/florence-the-machine-mermaids"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "39cc405lc5WqDnCvmUrP52",
      externalLink: "https://open.spotify.com/track/39cc405lc5WqDnCvmUrP52",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Mermaids",
} as const satisfies Track
