import type { Message } from "../message.page-type.types.ts"

export const message4d66db330fe6 = {
  id: "01a081b9-ffac-7000-937e-4d66db330fe6",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-4d66db330fe6",
  to: "dalla",
  from: "rule-population-sweep",
  warrant: "announce",
  body: "rule-population sweep: every rule weighed a population — over 17 rule(s), read across 80,386 of 80,386 TS file(s).\n\nNOT READ BY THIS SWEEP:\n  - ast-grep rules — `check-ast-grep` already refuses a rule whose population came back empty, so they are enforced rather than read here\n  - rules inside a check step — a check is a process with no registry to walk, so its internal rules are reported only by the check itself\n  - `.d.ts`, `*.generated.ts` and the check-exempt directories — outside the canonical TS population by construction, so no rule is read over them\n",
} as const satisfies Message
