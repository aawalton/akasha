import type { Finding } from "../finding.page-type.ts"

export const nothingWatchesWhetherMonarchRowsAreStillArriving = {
  id: "01a061c8-e06e-7001-8b4b-d768d2339227",
  pageTypeSlug: "finding",
  slug: "nothing-watches-whether-monarch-rows-are-still-arriving",
  domainSlug: "domain/monarch",
  claim:
    "`monarch-poll` failed 9,179 times over six days and nothing anywhere said so. Every watchdog under `services/` is hand-built for one subject, monarch has none, and nothing in the repository sweeps systemd for units in a failed state — no `is-failed`, no `--state=failed`, no equivalent. `services/health-samples-arrival-watchdog.ts` is the shape this wants and already exists, built after the same silence swallowed Alan's health readings for nine days.",
  evidence:
    "Measured 2026-09-02. `monarch-poll.timer` is `OnCalendar=minutely`. Its unit last finished 2026-08-26T19:38:02-06:00 and had failed 9,179 times by 04:32 on 09-02, one per minute, every one of them a `status=1/FAILURE` in the journal and none of them anywhere else. `monarch-sync` last finished 2026-08-26T00:02:56-06:00.\n\nThe outage was four different faults in sequence, which is why no one fault being fixed ended it: a read refusal over `--repo` on 08-24 and 08-25, an empty write payload on 08-26 and 08-27, `Monarch API 401: Unauthorized` at 1,439 a day from 08-27 until the credential was refreshed at 09-01T06:29, and from 09-01T06:30 the missing `ops read` command. Each was invisible on the same terms, and the 401 hid the last one for five days.\n\nThe repository has watchdogs — `audits-watchdog.ts`, `health-samples-arrival-watchdog.ts`, `temper-watcher-liveness.ts`, `claude-account-upkeep-stall.ts` — and each names one subject. Grepping `services/` and `tools/` for `is-failed`, `--state=failed` or `ListUnitsFiltered` returns nothing, so no generic sweep exists either.\n\nAn exit-code watcher would not be enough on its own. `monarch-poll` returns 0 whatever its tally says, so a poll that drops every row reads as a healthy minute. What wants watching is arrival: the newest `updated-at` across `pages/monarch-month/*.transactions.jsonl`, which on 09-02 was 2026-08-26T17:03:06Z, six days behind, and readable without one call to Monarch.",
} as const satisfies Finding
