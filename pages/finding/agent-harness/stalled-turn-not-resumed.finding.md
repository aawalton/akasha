---
id: d0e119e7-2f6c-5837-8dff-5a45f5a498b2
page-type-slug: finding
title: "Stalled turn not resumed"
domain-slug: domain/agent-harness
---

# Claim

A turn that ends on a transient upstream error leaves its seat alive, idle and silent, and
nothing brings it back when the error clears. From outside, a seat stalled this way is
indistinguishable from one that is working.

# Evidence

Observed 2026-08-13 on the seat dispatched onto project #18964.

The seat was spawned at 18:47Z and read its dispatch. Its first turn ended at 18:49Z on an
Anthropic 521 — Cloudflare reporting the origin refused the connection, marked retryable with
a 120-second backoff — before the seat had done any work.

At 19:09Z, twenty minutes later, `api.anthropic.com` answered normally. The seat was still
alive: its `spawn-headless` wrapper, its supervisor and its `claude` child were all running,
and `ops seat alive` reported live. Its transcript held three messages, the last being the
error, and its terminal showed an idle prompt. Nothing had re-prompted it in that window, and
nothing had recorded that anything was wrong. The project row still read
`awaiting_worker_seat` with a live seat on it.

It resumed only when a message was sent to it by hand.

WHAT MAKES THIS COSTLY RATHER THAN UNTIDY. The three signals a watcher has — the process is
alive, the row has a seat, the seat is idle — all read exactly as they do for a seat that is
thinking. The stall was found only because Alan asked for a status check on that project. A
seat dispatched and then not asked about would have held its row indefinitely.

The 120-second backoff the error itself carried is the interval nothing acted on.
