import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const aChangeDraftIsKilledAt120SecondsWhileApplyIsGiven300 = {
  id: "01a08e77-86a4-7445-af82-f254d48e6b05",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "a-change-draft-is-killed-at-120-seconds-while-apply-is-given-300",
  domain: "domain/change",
  claim:
    "Every command is watched by a timer that kills the process, and a command page says how long its command is given. `change apply` says 300 seconds. `change draft` says nothing, so it falls to the 120 the module allows by default. A change agent composing edits over many pages is the longest-running work a draft does, and the two escapes from the timer — the ones the landing and the apply run take — are both reached after a draft has already returned. So the drafting side is held to less than half what the landing side is given, and the ceiling was reached by saying nothing rather than by weighing what drafting costs.",
  evidence:
    "`commands/modules/stopping/command-stopping.module.code.ts:5` is `export const ALLOWED = 120`. `secondsIn` at lines 13-16 answers that wherever a page states no `timeout`: `const said = page === null ? undefined : page[TIMEOUT]`, then `return typeof said === 'number' && said > 0 ? said : ALLOWED`. The units are seconds — lines 28-29 spell `process.kill(pid, 'SIGKILL')` inside a `setTimeout` of `seconds * SECONDS`, with `SECONDS = 1000`. The watch is armed for every command at `commands/modules/calling/calling.module.code.ts:308`: `const watch = watching(secondsIn(page), calledAs)`. `commands/pages/change/apply/change-apply.command.ts:12` states `timeout: 300`; `commands/pages/change/draft/change-draft.command.ts` states no such key. The two escapes are on the landing road, not the drafting one: `allowedThrough()` at `commands/modules/landing/landing.module.code.ts:339` and `allowedAgain(MEASURED_ALLOWED, ...)` at `commands/modules/apply-running/apply-running.module.code.ts:156`. A draft returns before either, at `commands/modules/change-running/change-running.module.code.ts:372-374`: `if (drafts) { return { ...answered, report: [...answered.report, keptSaid(page, LANDS)] } }`. When the timer fires the worker prints the words at `command-stopping.module.code.ts:21-23` and kills the main process, so the edits composed so far are lost rather than kept.",
} as const satisfies Finding
