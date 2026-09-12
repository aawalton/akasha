import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const theRefusalAuditOfTheCommandSystemIsUnreviewed = {
  id: "01a09127-8c03-7caf-a082-f7515fdddfd7",
  type: "finding",
  slug: "the-refusal-audit-of-the-command-system-is-unreviewed",
  domain: "page-type/command",
  claim:
    "An audit read what a command does when it will not do the thing, provoking refusals to read them, and proposed sixteen things that are not so and should be. Two were overtaken by an intent that one spelling reaches a command. Nine more are settled: three invariants they rested on were dropped as false; the index refresh and the apply report no longer say nothing happened after it did; an apply reporting its edits gone was ruled too rare to guard; composing a refusal writes wherever the writing is declared; and five have intents of their own: what a command that wrote before it threw says, where a fault was thrown, what an exit code means, and naming the call that would succeed and the part refused. Two are unreviewed and live nowhere but a transcript. A refusal is the main teaching an agent meets, so a refusal that asserts the opposite of what happened is worse than a terse true one. Several rest on subagent sweeps rather than on files the auditor opened, and those are marked.",
  evidence:
    "Unreviewed. A lead is a line from a sweep the auditor did not verify itself.\n\n1. A refusal over a misspelled name points at the nearest name. Provoked: `akasha change-draft change-fil` answers with the whole act list and no nearest match, built at `change-running.module.code.ts:351` from `runsSaid` at `:141-143`. `command-walking.module.code.ts` discards which word broke the descent. `suggestClosest` already exists at `parse-args.module.code.ts:88-92`. Lead on that helper.\n\n2. Something checks that a refusal changed nothing up to the commit. `invariant-earns-its-place.model-check.ts:10-11` is off, with `changeRuns: 0, auditRuns: 0`. `repository-is-written-by-a-change.code-check.ts:35` exempts command code, where the writes are. The invariant this would have judged has since been dropped as false, so what a check holds has to be stated first. Lead.\n",
} as const satisfies Finding
