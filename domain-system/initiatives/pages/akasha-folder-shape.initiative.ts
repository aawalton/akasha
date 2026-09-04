import type { Initiative } from "../initiative.page-type.ts"

export const akashaFolderShape = {
  id: "01a05d15-af16-7ae2-8560-03099814e73b",
  pageTypeSlug: "initiative",
  slug: "akasha-folder-shape",
  domainSlug: "domain/akasha",
  personaSlug: "akasha",
  intents: [
    {
      statement: "The akasha subfolder has a clean folder shape.",
      workingMemory:
        "Two folders named `supabase` hold no supabase code. `pages-system/pages-ui/supabase` is 30 files of page and view shaping, reached by 15 `./supabase/*` export keys. `shared/pages-ui/src/supabase` is 26 files outside akasha whose only supabase reach is one auth call. Renaming either folder repoints its export targets already, but the export keys and the importers naming them wait on package renaming. Alan says the shape before it is written into the check.",
    },
    {
      statement: "Every folder under `akasha/` has a domain page saying what it gathers.",
      workingMemory:
        "`akasha/story` and `story/engine` hold folders and no page, which the `folders-only` shape allows. `akasha/alan` carries `alan.domain.ts` and `akasha/story` carries nothing, so the tree is read down through pages in one place and through the filesystem in another. The `folders-only` shape already holds a gap saying a folder of folders wants judging by which folders it holds.",
    },
    {
      statement:
        "A persona's championed domain is a relation that resolves rather than text that dangles.",
      workingMemory:
        "`championed-domain-slug` is a text property, so nothing repoints it when a domain's slug changes and nothing refuses it when it names no page. It broke twice in one session as `alan-harness` became `harness` and went back. Awen's persona names `narrative-engine`, which no page carries at all. The property's own page already holds the gap saying this is a relation to a domain.",
    },
    {
      statement: "A rule says when a part of the tree is its own package and when it is a folder.",
      workingMemory:
        "Nothing states this today, so it is decided case by case. Alan's default: a folder unless there is a reason to make it a package. A reason is a name the outside must reach: a manifest publishes a name and a folder does not, so six chess modules under `alan/web` are reached from outside by one export key alone and the other five by none. A folder inside a package holds modules already, as `pages-ui/app-version` does, so nesting needs no new machinery.",
    },
  ],
} as const satisfies Initiative
