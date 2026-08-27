---
id: bd486e2c-fc6d-5560-b1f1-ee149600cfdb
slug: entrypoint-comment-reports-the-criterion-cadence
page-type-slug: finding
title: "Entrypoint comment reports the criterion cadence"
domain-slug: domain/alanwalton-app
---

# Claim

The Aria story-points worker's head comment states a 60 s heartbeat sixty times faster than the constant thirty lines below it, whose own docblock says hourly and prices the rung on "within-a-day discovery". Both stand in one 250-line file, and the head comment is what a reader opening the entrypoint reads first, so the staleness budget they take away is the wrong one and nothing in the file disagrees with them out loud.

# Evidence

At `~/code` on `main`, `packages/alanwalton/aria-story-points/src/aria-story-points.worker.ts` lines 11-12 read `// via ` + "`@shared/worker-runtime`'s `runLongRunningWorker` — boot reconcile + 60 s" and `// heartbeat (both re-derive the scoped word-count sum from whole DB state) + one`. The phrase wraps the line, so `rg -n "60 s heartbeat"` over the file returns nothing; it is reachable only multiline.

Line 61 of the same file is `const PERIODIC_HEARTBEAT_INTERVAL_MS = 3_600_000` — one hour. Its docblock at lines 55-59 opens "BACKSTOP TICK — hourly, the ladder default" and closes "Within-a-day discovery is what the hourly rung is priced on." Line 218 passes that constant as `intervalMs` to `runLongRunningWorker`, so the constant is the wired value and the head comment is prose alone. Line 29 of the same head comment block says "the hourly heartbeat retries", so the file contradicts itself inside one comment as well as against its constant.

`pages/finding/code-repo/heartbeat-criterion-pinned-where-fleet-departs.finding.md` measures the fleet-wide version: a CI test pins 60 s on the ground that every conforming worker uses it, while seventeen of twenty sites are hourly. This site is a third state that finding does not name — not a worker at the wrong cadence, but a worker at the RIGHT cadence whose own prose reports the criterion's value instead of its own. A reader auditing cadence by reading entrypoint comments counts it in the 60 s column.

Found ingesting `dirty/code/packages-alanwalton-aria-story-points-claude.md`, whose "hourly heartbeat" matched the constant rather than the comment.
