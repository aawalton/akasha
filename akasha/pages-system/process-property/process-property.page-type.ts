import type { PageProperty } from "../page-property/page-property.page-type.ts"
import type { PageType } from "../page-type/page-type.page-type.ts"

export type ProcessProperty = PageProperty

export const processProperty = {
  id: "01a05406-9bc6-71c5-8fcf-b15b97d86578",
  pageTypeSlug: "page-type",
  slug: "process-property",
  definition: "a page property holding one run of one program",
  pluralSlug: "process-properties",
  extendsSlug: "page-type/page-property",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A process is its pid and the start time the kernel fixed at exec, joined by a hyphen.",
    },
    {
      invariantKind: "departure",
      statement:
        "A pid is handed out again once its process ends, so a pid alone names no run and this is one value rather than two.",
    },
    {
      invariantKind: "departure",
      statement:
        "The start time is counted in clock ticks since the machine booted, so a process names its run within one boot.",
    },
    {
      invariantKind: "departure",
      statement:
        "A process still standing is the one named only where the start time read now matches the one held.",
    },
  ],
} as const satisfies PageType
