---
id: 1e290e18-f995-5640-aa00-9cebef60e970
page-type-slug: finding
title: "Complete hides failed streams"
domain-slug: domain/agent-fleet
---

# Claim

The OAuth proxy's per-stream transport log files 167,385 real failures under `termination: "complete"` — 12.5% of that branch on `/v1/messages` — and no live file states the three-field combination that tells them from successes.

# Evidence

Measured 2026-08-07 in `~/code` at the checkout in hand, while emptying `dirty/code/packages-agents-oauth-docs-transport-retry.md`.

`packages/agents/oauth-proxy/src/transport-log.ts` writes one JSONL record per `/v1/messages` stream termination to `~/code/.claude/supervisors/<agentId>/supervisor-transport.jsonl`. 8,394 such files stand. Read whole and aggregated with `jq -s`, restricted to `path == "/v1/messages"` and `termination == "complete"`:

- 1,343,863 records on that branch.
- 37,223 carry `httpStatus == 200` with `sawMessageStop == false`. Upstream answered 200 and the stream ended before `message_stop` — an `event: error` SSE frame, closed cleanly. Claude Code surfaces it as a stream failure.
- 130,162 carry a non-2xx `httpStatus`. The error JSON flowed through without throwing, so the reader saw a clean end.

167,385 of 1,343,863, or 12.5%, are failures the user saw, filed under the one branch name that reads as success. `complete` records only that `reader.read()` returned `done: true`.

Nothing live states the discriminator. `rg` over tracked `.ts` for `silent error`, `sawMessageStop` and `message_stop` returns the schema field, the SSE regex, the once-set assignment and test fixtures — mechanics, never the reading. `rg -n "TransportEventSchema" --glob '!dist' -l` returns `transport-log.ts` and three test files, so no instrument reads these records and classifies them.

The one place the discrimination was written is the quarantined document above, which cites it as the argument for having added `httpStatus`: before that field, a silent error "appeared identical to a successful single-frame response in the log". That document is queued for its own removal, so the reading goes with the sweep while the records keep accumulating.

Why it stays invisible: an operator filtering `termination != "complete"` gets a log that looks healthy, and the 12.5% is on the other side of the filter.
