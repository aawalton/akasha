---
id: 408f071e-0734-5712-a573-f3a08d08d256
slug: json-records-lost-through-a-pipe
page-type-slug: finding
title: "JSON records lost through a pipe"
domain-slug: domain/global
---

# Claim

A check emitting `--json` records through a pipe loses records silently and still exits 0, because `exitOnResult` calls `process.exit` before the async stdout stream drains. Redirected to a file the same run is complete, so the path an author tests by hand is the one path where the loss is invisible, and the consumer that pipes is the machine consumer that cannot notice.

# Evidence

REPRODUCED HERE, at bun 1.3.14, with a script that writes N NDJSON lines to `process.stdout` and then calls `process.exit(0)` — the shape `reportViolations` and `exitOnResult` have between them:

    n=905     file 905    pipe 905
    n=5000    file —      pipe 4015, then 4613 on a second run
    n=50000   file 50000  pipe 49690

To a file every run is complete. Through a pipe the loss is silent, non-deterministic, and carries exit 0. The threshold has moved since this was first measured — 905 records were truncated to 313 on the bun of 2026-07-28 and now survive — so the defect did not go away, it got quieter, which is the worse direction for a latent one.

THE CALL SHAPE IS STILL THERE. `packages/infra/checks/src/lib/violation-reporter.ts:200` writes one record per violation in a loop through `writeLine`, which calls `stream.write`. `exitOnResult` at line 290 calls `reportViolations` and then `process.exit(code)` at line 300. Nothing between them drains. 156 files under `packages/infra/checks/src/checks/` reference `exitOnResult`.

WHY THE LATENCY MATTERS. Most checks emit few enough records to survive, so this appears when a check's population grows rather than when its code changes. A check that was correct on Monday loses records on Friday because the repo grew, and nothing reports the change.

A WORKAROUND THAT MADE IT WORSE, RECORDED SO NOBODY REPEATS IT. Replacing the loop with a single `fs.writeSync(process.stdout.fd, …)` over the whole payload yielded a deterministic 43 lines, about one 64 KB pipe buffer: bun's stdout pipe is non-blocking, so `writeSync` short-writes and the remainder is lost at exit. The fix is not at the call site.

NOT MEASURED. Which live checks currently emit past the threshold, and whether setting `process.exitCode` and returning, rather than calling `process.exit`, is safe for every one of the 156 call sites.
