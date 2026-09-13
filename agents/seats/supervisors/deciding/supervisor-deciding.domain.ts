import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const supervisorDeciding = {
  id: "01a09c75-84b5-7f3a-8dc1-d35249a24e4d",
  type: "domain",
  slug: "supervisor-deciding",
  definition: "the decisions a supervisor asks a command for",
  parts: [
    "module/supervisor-ask-rule",
    "module/supervisor-decide",
    "module/supervisor-decide-payload",
    "module/supervisor-decide-rule-inputs",
    "module/supervisor-decide-rules",
  ],
} as const satisfies Domain
