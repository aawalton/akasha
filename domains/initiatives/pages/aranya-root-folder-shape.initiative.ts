import type { Initiative } from "../initiative.page-type.ts"

export const aranyaRootFolderShape = {
  id: "01a08257-6635-725b-b328-6665c66c0e46",
  pageTypeSlug: "initiative",
  slug: "aranya-root-folder-shape",
  domainSlug: "domain/akasha",
  personaSlug: "aranya",
  parentSlug: "initiative/akasha-folder-shape",
  intents: [
    {
      statement: "The root akasha folder has its own approved folder shape.",
    },
    {
      statement: "The root akasha folder matches its folder shape.",
    },
  ],
} as const satisfies Initiative
