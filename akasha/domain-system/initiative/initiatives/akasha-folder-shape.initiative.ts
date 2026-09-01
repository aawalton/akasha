import type { Initiative } from "../initiative.page-type.ts"

export const akashaFolderShape = {
  id: "01a05d15-af16-7ae2-8560-03099814e73b",
  pageTypeSlug: "initiative",
  slug: "akasha-folder-shape",
  domainSlug: "domain/akasha-system",
  personaSlug: "akasha",
  parentSlug: "akasha-migration",
  intents: [
    { statement: "No non-auth code for supabase remains." },
    { statement: "The akasha subfolder has a clean folder shape." },
    { statement: "The folder-matches-a-shape check judges a folder holding no file of its own." },
    { statement: "Renaming a workspace package is a single safe akasha move." },
  ],
} as const satisfies Initiative
