---
id: 3556bcc7-dc53-5bb5-afd1-c204369eeb8d
page-type-slug: finding
title: "Disconnect artifact unmarked"
domain-slug: domain/agent-fleet
---

# Claim

109,125 records in the OAuth proxy's retained transport log attribute a normal streaming hand-off to `client_disconnect`, an artifact of a bug fixed in 2026-07, and nothing beside the data says so.

# Evidence

Measured 2026-08-07 in `~/code` at the checkout in hand, while emptying `dirty/code/packages-agents-oauth-docs-transport-retry.md`.

All 8,394 `~/code/.claude/supervisors/*/supervisor-transport.jsonl` files, aggregated with `jq -s` and grouped by `termination`:

| branch | records | of those, `framesUpstream == 1` |
|---|---|---|
| `complete` | 1,408,432 | 227,454 |
| `client_disconnect` | 110,397 | 109,209 |
| `downstream_cancel` | 6,496 | 5,976 |
| `proxy_shutdown` | 690 | 37 |
| `upstream_error` | 122 | 3 |

98.9% of `client_disconnect` sits at `framesUpstream == 1`. Grouping that subset by `ts[0:7]` shows it is a repaired bug rather than a standing behaviour:

| month | records |
|---|---|
| 2026-05 | 8,436 |
| 2026-06 | 100,689 |
| 2026-07 | 67 |
| 2026-08 | 17 |

The cause is recorded in the quarantined document above: before the stream-duration in-flight-count fix, the fetch handler's `fetch_handler_exit` branch fired unconditionally at handler return and won the once-set race against real terminations, filing ordinary streaming hand-offs as `client_disconnect`. `packages/agents/oauth-proxy/src/oauth-proxy.ts` lines 245-275 carry the repaired shape — `client_abort` from `req.signal`, `fetch_handler_exit` only when no live stream was handed off — and say nothing about what the log holds from before.

So the corpus is bimodal and nothing marks the seam. An analyst summing `client_disconnect` across the retained files reads 110,397 client drops; the true figure after the fix is on the order of 100 across two months. The cliff shows only if the reader thinks to bucket by month, which they would do only having already suspected it.

That document is queued for its own removal, which is why this is filed here: the decoder for 109,125 standing records otherwise goes with the sweep.
