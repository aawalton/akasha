import type { Initiative } from "../initiative.page-type.ts"

export const astraPagesCleanup = {
  id: "01a06cd9-a5d8-7ceb-980a-d9e77ebb0437",
  pageTypeSlug: "initiative",
  slug: "astra-pages-cleanup",
  domainSlug: "workspace-package/page",
  personaSlug: "astra",
  intents: [
    {
      statement: "All pages-specific files are organized in the pages/ folder.",
      workingMemory:
        "`@akasha/pages-system` is renamed to `@akasha/pages` across the repository: expand at `98dc779f`, eight mechanical migrate batches, contract at `1ff9f931`. `akasha refactor rename package` runs one phase a call and reads which phase from the manifests. The alias expand writes, `workspace:@akasha/pages@*` under the old name, makes `bun install` refuse here, though that same spelling installs in a stub workspace built from these manifests, so no seat could install for the whole migrate window.",
    },
    {
      statement: "The pages/ folder passes the `folder-matches-a-shape` check.",
      workingMemory:
        "A workspace-package page paired with a page type takes the singular slug now, and `folder-matches-a-shape` reads it that way: `pairedIn` takes the pair, `packageIn` matches the page type's slug, and `holds` answers both identities. What `pages/` refuses cannot be read: 291 untracked symlinks sit in the checkout, 9 of them under `pages/`, and the walk offers each as a file, so the check judges nothing until they go. `system-service/workstation-services` still holds one page of one type, which only the disabled `pages-of-one-type` admits.",
    },
  ],
} as const satisfies Initiative
