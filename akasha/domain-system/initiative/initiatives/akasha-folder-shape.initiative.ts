import type { Initiative } from "../initiative.page-type.ts"

export const akashaFolderShape = {
  id: "01a05d15-af16-7ae2-8560-03099814e73b",
  pageTypeSlug: "initiative",
  slug: "akasha-folder-shape",
  domainSlug: "domain/akasha-system",
  personaSlug: "akasha",
  parentSlug: "akasha-migration",
  intents: [
    {
      statement: "The akasha subfolder has a clean folder shape.",
      workingMemory:
        "Two folders named `supabase` hold no supabase code. `akasha/pages-system/pages-ui/supabase` is 30 files of page and view shaping, reached by 15 `./supabase/*` export keys. `shared/pages-ui/src/supabase` is 26 files outside akasha whose only supabase reach is one auth call. Renaming either folder repoints its export targets already, but the export keys and the importers naming them wait on package renaming. Alan says the shape before it is written into the check.",
    },
    { statement: "The folder-matches-a-shape check judges a folder holding no file of its own." },
    { statement: "Renaming a workspace package is a single safe akasha move." },
  ],
} as const satisfies Initiative
