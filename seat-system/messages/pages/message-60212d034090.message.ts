import type { Message } from "../message.page-type.ts"

export const message60212d034090 = {
  id: "01a07c93-a52e-7000-8651-60212d034090",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-60212d034090",
  to: "dalla",
  from: "rule-population-sweep",
  warrant: "announce",
  body: "rule-population sweep: every rule weighed a population — over 17 rule(s), read across 80,083 of 80,083 TS file(s).\n\nNOT READ BY THIS SWEEP:\n  - ast-grep rules — `check-ast-grep` already refuses a rule whose population came back empty, so they are enforced rather than read here\n  - rules inside a check step — a check is a process with no registry to walk, so its internal rules are reported only by the check itself\n  - `.d.ts`, `*.generated.ts` and the check-exempt directories — outside the canonical TS population by construction, so no rule is read over them\n",
} as const satisfies Message
