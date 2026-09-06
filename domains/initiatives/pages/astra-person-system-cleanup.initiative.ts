import type { Initiative } from "../initiative.page-type.ts"

export const astraPersonSystemCleanup = {
  id: "01a06cd9-a5d8-7ceb-980a-d9e77ebb0437",
  pageTypeSlug: "initiative",
  slug: "astra-person-system-cleanup",
  domainSlug: "workspace-package/page",
  personaSlug: "astra",
  intents: [
    {
      statement: "All pages-specific files are organized in the pages/ folder.",
      workingMemory:
        "`@akasha/pages-system` is renamed to `@akasha/pages`, and `@akasha/pages-system-service` to `@akasha/pages-service` in `pages/service/`, both pages under it slugged `pages-service`. `akasha refactor rename package` runs one phase a call and reads which phase from the manifests. Two faults it leaves: the alias expand writes makes `bun install` refuse here though that spelling installs in a stub workspace, and a page-slug rename reports what it will not repoint as a list to judge by hand, where I missed the `SERVICE_SLUG` const that took the store down.",
    },
    {
      statement: "The pages/ folder passes the `folder-matches-a-shape` check.",
      workingMemory:
        "Met: `pages/` judges 1630 files and refuses none. A workspace-package page paired with a page type takes the singular slug, `folder-matches-a-shape` reads it that way, and `pages/address-kinds` no longer opens with the name of the page above it. A folder holding one workstation service with its parts has a shape of its own, `a-workstation-service-with-its-parts`, and the page type shape holds `workstation-services` beside `modules`, `pages`, `properties` and `scripts`.",
    },
  ],
} as const satisfies Initiative
