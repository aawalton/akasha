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
      statement: "No slug is plural.",
    },
    {
      statement: "One rename carries every page whose folder name that rename breaks.",
      workingMemory:
        "Waits on one spelling of the folder-naming rule, today written three times: `module/folder-naming`, stripping the parent's names recursively; `module/page-composing`, stripping the page type's slug one level for a page the index has not got; and `module/page-renaming`, reading the folder's own basename. A rename reaches the third, falls back to the second, and never reaches the first. It carries what sits under the old folder with relative paths kept and re-derives nothing about a child.\n",
    },
    {
      statement: "A domain wrapping one page and that page are one page.",
      workingMemory:
        "No slug is held by both a domain page and a page type any more, so the eighteen are landed, and temper-watcher and page-service with them. 62 of the 482 domains still wrap exactly one page, about 45 of those a domain over a single `modules/<one>` folder and the rest a domain over one domain, as `domain/text` sits over `domain/quote`. Four wrap a service-cluster and wait on the registry intent below: git-transport, eso-rig, auth-proxy and postgres-annual-dump.\n",
    },
    {
      statement: "A property page sits under the page type declaring that property.",
      workingMemory:
        "About 140 of the 220 stray part edges are this shape. A page type in a subfolder names a property page sitting in the parent domain's `properties` folder, so the property sits beside the page type rather than under it. `page-type/temper-skill` at temper/catalog/temper-skill/temper-skills names `boolean-property/is-morph` at temper/catalog/temper-skill/properties. The whole temper catalog is built that way, and so are `page-type/argument` and `page-type/number-property`.",
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
