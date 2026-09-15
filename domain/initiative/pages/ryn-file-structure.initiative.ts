import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const rynFileStructure = {
  id: "01a09fef-e83b-7b93-9938-07b24a8de66b",
  type: "initiative",
  slug: "ryn-file-structure",
  domain: "domain/file",
  persona: "persona/ryn",
  intentStack: [
    {
      statement: "A folder is named in the singular.",
    },
    {
      statement: "No domain or page type slug is plural.",
      workingMemory:
        "Alan narrowed this intent to the pages that own a structural folder. The 1513 module slugs ending in a plural `s` stay as they are. 85 domain slugs and 6 page-type slugs end that way. Some of those read as singular already and stay: mathematics, talos, seaweedfs, util-fs, great-courses, visual-arts, book-series, ki-book-series, world-species. Renaming a domain renames the folder that domain names, so this intent and the folder one land in one motion.\n",
    },
    {
      statement: "A domain wrapping one page and that page are one page.",
      workingMemory:
        "No slug is held by both a domain page and a page type any more, so the eighteen are landed, and temper-watcher and page-service with them. 62 of the 482 domains still wrap exactly one page, about 45 of those a domain over a single `modules/<one>` folder and the rest a domain over one domain, as `domain/text` sits over `domain/quote`. Four wrap a service-cluster and wait on the registry intent below: git-transport, eso-rig, auth-proxy and postgres-annual-dump.\n",
    },
    {
      statement:
        "A page sits under the page naming it a part rather than in a registry of its own kind.",
      workingMemory:
        "65 stray part edges: 33 service-workstations, 15 readouts, 13 service-inferences, 3 dashboards and 1 repo, each owned by a scattered domain and filed centrally where it deploys from. `domain/email-watch` names `service-workstation/alan-email-worker` at infrastructure/service/workstation/pages. One page names all 13 inferences and one names all 3 dashboards; the 33 workstations come from 21 namers. Whether the owning domain or the deploy tree is the right home is unsettled, and Alan settles it.\n",
    },
  ],
  constraints: [
    "A page listing is reached at its page type's slug.",
    "A folder's name drops the prefix the folder above it already says.",
    "A folder named `.server` keeps that name, because React Router reads that name and no other.",
    "A folder a page above claims is named by that page, and a folder under a claimed folder is named by whatever writes it.",
    "A part edge is measured over every page whose page type extends domain, not over domain pages alone.",
  ],
} as const satisfies Initiative
