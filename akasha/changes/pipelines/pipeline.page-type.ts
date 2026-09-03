import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"

export type Pipeline = Page

export const pipeline = {
  id: "01a06835-e288-7d6f-aaf4-ff2e758872eb",
  pageTypeSlug: "page-type",
  slug: "pipeline",
  definition: "one run of the workflows a commit needs",
  pluralSlug: "pipelines",
  extendsSlug: "page-type/page",
  mortal: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A worker reads the settling pages on every tick and takes an event as haste only.",
    },
    {
      invariantKind: "absence",
      statement: "No worker consumes an event log.",
    },
    {
      invariantKind: "departure",
      statement: "A workflow whose watched files reach nothing fails rather than falling back.",
    },
    {
      invariantKind: "departure",
      statement: "A failure lifts only when the same workflow runs again on the same branch.",
    },
    {
      invariantKind: "absence",
      statement: "A newer commit landing behind a failure never lifts that failure.",
    },
    {
      invariantKind: "departure",
      statement: "A step's script is one argument to `sh`.",
    },
    {
      invariantKind: "departure",
      statement: "Kubernetes writes `Error` for a nonzero exit whose cause it does not know.",
    },
    {
      invariantKind: "gap",
      statement: "A pipeline's definition is fixed by one commit in each repository it reads.",
    },
    {
      invariantKind: "gap",
      statement: "One writer moves a step page, never the dispatcher and the step both.",
    },
    {
      invariantKind: "gap",
      statement: "What a check builds the main pipeline reuses rather than building it again.",
    },
    {
      invariantKind: "gap",
      statement: "What a check builds is removed once no pipeline will read it again.",
    },
  ],
} as const satisfies PageType
