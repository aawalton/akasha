import type { Finding } from "../finding.page-type.ts"

export const monarchPollReturns0WhateverItsTallySays = {
  id: "01a061c8-e06e-7000-a5df-602fe51acf7b",
  pageTypeSlug: "finding",
  slug: "monarch-poll-returns-0-whatever-its-tally-says",
  domainSlug: "domain/monarch",
  claim:
    "`services/monarch-poll.ts` throws away the `PollTally` `pollTransactions` hands back and returns 0 unconditionally, so a minute that fetched rows, dropped every one and wrote no file exits like a minute that landed them all. Two drops hide behind that 0: a row naming an account no account file carries is warned about and skipped, and the `skipped` count `linesFrom` returns is never read in `monarch/poll.ts`. The exit code answers whether the process threw, never whether a row arrived.",
  evidence:
    'Read rather than run, because running it means calling Monarch.\n\n`services/monarch-poll.ts` `main()` is three lines: it handles `--help`, awaits `pollTransactions(...)` discarding the result, and returns 0. The `PollTally` type carries `seen`, `changed`, `landed` and `retired`, and no caller looks at any of them.\n\nTwo ways `landed` reaches 0 with no throw. First, `monarch/poll.ts` filters the fetched rows to `ready` — those whose account the mirror already carries — and `console.warn`s the remainder as "left for the daily full sync rather than failing every run after this one". That is a deliberate trade, but the daily full sync is `monarch-sync`, whose own last success was 2026-08-26 00:02:56, so through this outage the fallback was itself broken and the drop was permanent rather than deferred. Second, `linesFrom` returns `{ lines, skipped, unknownTags }` and `monarch/poll.ts` reads `lines` and `unknownTags` and never `skipped`; `monarch/sync.ts:70` does report the same count, so the omission is in the poll alone. A row `lineOf` rejects leaves no line of output at all.\n\nDownstream of both, `landTransactionFiles` returns `[]` as soon as its `touched` map is empty, so `through()` is never reached and no write is attempted. Nothing distinguishes that from a quiet minute.\n\nThe inverse also holds and matters on the first run after a backlog: `pollTransactions` runs `categorizeRecent` after the rows have landed and throws when any row is contested, so a run can write every file correctly and still exit 1.',
} as const satisfies Finding
