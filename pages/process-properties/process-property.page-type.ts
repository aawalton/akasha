import type { PageType } from "../types/page-type.page-type.types.ts"

export const processProperty = {
  id: "01a05406-9bc6-71c5-8fcf-b15b97d86578",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "process-property",
  definition: "a page property with one run of one program",
  pluralSlug: "process-properties",
  extends: ["page-type/page-property"],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A process is its pid and the start time the kernel fixed at exec joined by a hyphen.",
    },
    {
      invariantKind: "departure",
      statement: "A pid is handed out again once its process ends.",
    },
    {
      invariantKind: "departure",
      statement: "The start time is counted in clock ticks after the machine booted.",
    },
    {
      invariantKind: "departure",
      statement: "A process names its run within one boot.",
    },
    {
      invariantKind: "departure",
      statement:
        "An existing process is the process named only where the start time read now matches the time held.",
    },
  ],
  types: "ts",
} as const satisfies PageType
