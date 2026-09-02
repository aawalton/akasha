import type { Domain } from "../../../domain-system/domain/domain.page-type.ts"

export const inboxes = {
  id: "01a06230-b156-7347-be47-6f5960ced389",
  pageTypeSlug: "domain",
  slug: "inboxes",
  definition: "the inboxes Alan keeps at empty",
  partSlugs: [
    "readout/inboxes-email",
    "readout/inboxes-tasks",
    "workstation-service/inbox-reading-service",
    "workstation-service/inbox-relay-service",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A count is read from the pages the workstation's checkout carries.",
    },
    {
      invariantKind: "departure",
      statement:
        "The reading is taken by a workstation timer rather than by a pod serving a route.",
    },
    {
      invariantKind: "departure",
      statement: "Every site showing an inbox is carried the count rather than taking one.",
    },
    {
      invariantKind: "departure",
      statement: "A carry that fails to one site does not stop the carry to another site.",
    },
    {
      invariantKind: "departure",
      statement: "The tile shows the counts Alan's workstation last took.",
    },
    {
      invariantKind: "constraint",
      statement: "A count nothing can be read for is shown as no signal rather than as a zero.",
    },
    {
      invariantKind: "departure",
      statement: "The game tasks among Alan's inboxes belong to temper rather than here.",
    },
  ],
} as const satisfies Domain
