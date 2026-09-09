import type { Module } from "@akasha/code/module"
import type { PageType } from "@akasha/pages/page-type"

export type Performance = Module

export const performance = {
  id: "01a08786-9212-746c-80e0-13134209de62",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "performance",
  definition: "code that measures how fast something is",
  pluralSlug: "performances",
  extends: ["page-type/module"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A performance is run by naming it rather than by a check.",
    },
    {
      invariantKind: "departure",
      statement: "A performance run reports what it measured rather than refusing.",
    },
    {
      invariantKind: "departure",
      statement: "A performance's test judges that performance's code rather than measuring.",
    },
    {
      invariantKind: "departure",
      statement: "One performance is run at a time.",
    },
    {
      invariantKind: "absence",
      statement: "No ceiling on processor time bounds a performance's run.",
    },
  ],
} as const satisfies PageType
