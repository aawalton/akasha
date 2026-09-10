import type { Initiative } from "../initiative.page-type.types.ts"

export const amyHarnessImprovements = {
  id: "01a087b7-34b5-7bf9-bc45-4b2eb623b673",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "amy-harness-improvements",
  domain: "domain/alan-harness",
  persona: "amy",
  intents: [
    {
      statement:
        "The code editor panel named Page Types is a tree of page types by what each extends.",
      workingMemory:
        "`module/page-tree-assemble` builds the rows, and `code-editor-data-interface/page-tree` names the file the panel reads. Today every page type is a root and each carries a `properties` child. `extends` is a list, so a type naming two types needs a rule for which one holds it; `page-type/page` is the root of the chain. The panel's title lives in the extension's contribution rather than on the page.",
    },
  ],
} as const satisfies Initiative
