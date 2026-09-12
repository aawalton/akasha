import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const selfHealing = {
  id: "01a08865-01fe-7c5a-ad92-7c42a01e7c23",
  type: "domain",
  slug: "self-healing",
  definition: "a supervisor replaced in place by the version its files now hold",
  parts: [
    "module/supervisor-file-version",
    "module/supervisor-handoff-env",
    "module/supervisor-reexec",
    "module/supervisor-reexec-mark",
    "module/supervisor-self-heal",
    "module/supervisor-self-heal-install",
    "module/supervisor-self-heal-jitter-decide",
    "module/supervisor-self-heal-jitter-rule",
    "module/supervisor-self-heal-state",
  ],
} as const satisfies Domain
