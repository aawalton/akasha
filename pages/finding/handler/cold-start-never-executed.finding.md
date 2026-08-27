---
id: bbecf5f6-9617-5b3b-bdae-2264413e5913
page-type-slug: finding
title: "Cold start never executed"
domain-slug: role/handler
---

# Claim

The handler cold start is deployed and armed and has never executed: no person's handler seat has ever existed, so nothing has yet shown that an inbound starts one or that the seat is told who sent it.

# Evidence

Read on 2026-08-11, after #18488 landed on `main` at `d54604c892`.

`ops seat list` over 1,569 rows carries exactly one handler seat, `amy-alan-handler`, which predates this work and is interactive rather than started by a message. No `amy-ki-handler` and no `claude-jenny-handler` seat has ever been minted, though both names stand on their people's relationship rows as the handler each is routed to.

So two guarantees stand on construction and on suites rather than on a run. That an inbound starts its person's handler when none is running is `handler-cold-start`'s to do, deployed and never reached. That a delivered message carries the sending person's identity is written and never delivered, because a delivery to a person's handler is what has not happened.

Only an inbound from an enrolled person settles either, and the two ways to manufacture one are forging a webhook as a real person or enrolling somebody in production. Neither is evidence: a seat booted to serve a fabricated message serves a fiction. One real text from either enrolled person drives the mint, the watcher tick, the start and the service in a single pass.

Alan was asked on 2026-08-11 and declined for now, so this is recorded rather than held on a row nobody works.
