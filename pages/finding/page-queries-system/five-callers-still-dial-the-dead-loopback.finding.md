---
id: 24af063e-6989-5874-8434-33e4db4cced1
page-type-slug: finding
slug: five-callers-still-dial-the-dead-loopback
title: "Three callers still name a loopback port nothing listens on, and none of them is now the silent case"
domain-slug: domain/page-queries-system
---

# Claim

`http://127.0.0.1:8787` is built into five call sites, and nothing has listened on that port since the page query service was deleted. The two that fired for every seat — a hook at every session start and a hook at every turn end, each swallowing its failure whole — are repaired. Three still name the address: one reads its failed read as a true empty, one reports the failure and retries, and one has no production caller.

# Evidence

Read on 2026-08-28 against `abe6a84f2` and `373132e0b`, both on `main`. `ss -ltn` shows no 8787, and `curl -s -m 3 http://127.0.0.1:8787/` returns `000` and exit 7.

**The two that fired for every seat.** `tools/hooks/agent-hook-local-agent-session-start.agent-hook.code.attachment.ts` and `tools/lib/hook-decision-record.ts` each held their own `originOf()` defaulting to the loopback — `noteRotation` posting to `/patch/seat/<seat>`, `record` posting every seat-turn-end-decision row to `/write-row/seat-turn-end-decision/<name>` — and each spawned `curl -s -m 2 -o /dev/null` with `stdout` and `stderr` at `"ignore"` inside `try/catch { return }`, never reading the exit status. Both now land through `tools/lib/page-query-client.ts` and say on stderr when a landing is refused. The async change carried into `tools/lib/turn-end-decide-call.ts` and two inference hooks. Landed at `fb6d23774`, `2026-08-28T09:09:38Z`.

Measured: two rows landed in `agent/seat/dalla.seat.turn-end-decisions.uncommitted.jsonl` at `09:09:53.601Z` and `09:09:59.618Z`, from `block-headless-halt` and `block-interactive-stall`. The newest anywhere before them stood at `2026-08-27T21:53:35.153Z`, in `agent/seat/amy.seat.turn-end-decisions.uncommitted.jsonl`. Not measured: how many rows were lost between.

**The three that still name it.** `tools/lib/forward-turn.sh:5` defaults `PAGE_QUERY_ORIGIN` to the loopback and reads its failed read as a true empty. `editor-extension/src/seat/observation-store.ts:25` imports the constant; `:187-195` reports the failure and returns without advancing `writtenKey`, so the observation is retried. `readouts/ask-over-http.ts:7` exports the loopback and `:66` exports `askOverHttp`, which no production caller reaches.

None of the five uses `@shared/pages-query`, whose `fetchThrough` seam `tools/ops/page-queries-in-process.ts` arms from `tools/ops/cli.ts:29` for every `ops` command: four dial URLs they build themselves, the fifth runs `curl` from a shell script.
