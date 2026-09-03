import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"

export type Step = Page

export const step = {
  id: "01a06835-e289-76ba-ba1f-756dc641a23f",
  pageTypeSlug: "page-type",
  slug: "step",
  definition: "one run of commands in one container",
  pluralSlug: "steps",
  extendsSlug: "page-type/page",
  mortal: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A step carries a gate of its own, so a workflow may dispatch only some steps.",
    },
    {
      invariantKind: "departure",
      statement: "A step's page states what the step is and its sidecar what the step is doing.",
    },
    {
      invariantKind: "departure",
      statement: "A step runs on the cluster, whatever machine drives it.",
    },
  ],
} as const satisfies PageType
