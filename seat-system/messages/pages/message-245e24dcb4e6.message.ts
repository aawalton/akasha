import type { Message } from "../message.page-type.ts"

export const message245e24dcb4e6 = {
  id: "01a06d20-50b2-7000-b4dc-245e24dcb4e6",
  pageTypeSlug: "message",
  slug: "message-245e24dcb4e6",
  to: "dalla",
  from: "rule-population-sweep",
  warrant: "announce",
  body: "rule-population sweep: every rule weighed a population — over 17 rule(s), read across 78,664 of 78,665 TS file(s).\n\nNOT READ BY THIS SWEEP:\n  - ast-grep rules — `check-ast-grep` already refuses a rule whose population came back empty, so they are enforced rather than read here\n  - rules inside a check step — a check is a process with no registry to walk, so its internal rules are reported only by the check itself\n  - `.d.ts`, `*.generated.ts` and the check-exempt directories — outside the canonical TS population by construction, so no rule is read over them\n",
} as const satisfies Message
