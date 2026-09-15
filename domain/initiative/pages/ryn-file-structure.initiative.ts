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
        "Alan narrowed this to the pages that own a structural folder; the 1513 module slugs ending in `s` stay. These read as singular already and stay: mathematics, talos, seaweedfs, util-fs, great-courses, visual-arts, book-series, ki-book-series, world-species, temper-holdings. Renaming a domain renames its folder, so this intent and the folder one land in one motion. Only cluster-manifests is left, and its rename and its folder move refuse apart and refuse together.\n",
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
    "A page type whose one page holds many of a thing keeps that plural in its slug.",
    "A proper name a plural is part of is left as it is spelled outside akasha.",
    "A plural naming one whole is a collective acting as a singular, because dropping the `s` names something else.",
  ],
} as const satisfies Initiative
