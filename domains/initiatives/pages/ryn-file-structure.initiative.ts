import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const rynFileStructure = {
  id: "01a09fef-e83b-7b93-9938-07b24a8de66b",
  type: "initiative",
  slug: "ryn-file-structure",
  domain: "domain/file",
  persona: "ryn",
  intentStack: [
    {
      statement: "No page states a plural slug.",
    },
    {
      statement: "A folder is named in the singular.",
    },
    {
      statement: "A folder's name is worked out from the page type of what that folder holds.",
    },
    {
      statement: "No slug is plural.",
    },
    {
      statement: "A domain wrapping one page type and that page type are one page.",
      workingMemory:
        "Eighteen slugs were held by both a domain page and a page type. Thirteen shared a folder with the domain naming its own page type a part. Landed: tracking-capture, change, supervisor-action, inference-run, term. In flight: agent, domain, persona, page, readout, seat, service, index. Of the five not sharing a folder, secret and temper-skill merge with a move, image dissolves into comfy, day renames to day-boundary, and cluster merges into infrastructure/cluster.",
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
        "About 60 stray part edges. Thirty service-workstations, thirteen service-inferences, thirteen readouts, three dashboards and a repo are owned by a scattered domain but filed centrally where they deploy from. `domain/email-watch` at alan/harness/email-watch names `service-workstation/alan-email-worker` at infrastructure/services/workstations/pages. Whether the owning domain or the deploy tree is the right home is unsettled.",
    },
    {
      statement: "No page names a sibling a part.",
      workingMemory:
        "Thirty stray part edges. `seat-turn-state/idle` names `seat-turn-state/idle-pending` in the same pages folder, `ast-unused-config/every-workspace` names its seven siblings, and twenty-one page-property-entry records name field properties sitting beside them. A parts edge inverts to a parent, so a page naming its sibling makes that sibling its child while the folders say otherwise.",
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
