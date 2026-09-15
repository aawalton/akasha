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
        "43 are folded and 34 wrappers stay. Fold only where the wrapper and its one part say one concern twice, as util-hashing and sha256-hex did; the module or change page survives, since both extend domain, so no domain is lost. The 34 fail that: the wrapper names an area, its one part is one thing inside, and folding would destroy a definition. They are 10 module, 11 domain, 1 change-agent-prose, 8 page type, 2 manifest and 2 router-app. The intent wants narrowing to that test before it can be met.\n",
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
  ],
} as const satisfies Initiative
