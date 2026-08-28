---
id: 24af063e-6989-5874-8434-33e4db4cced1
page-type-slug: finding
slug: five-callers-still-dial-the-dead-loopback
title: "Three callers still name a loopback port nothing listens on, and none of them is now the silent case"
domain-slug: domain/page-queries-system
---

# Claim

`http://127.0.0.1:8787` was built into five call sites, and nothing has listened on that port since the page query service was deleted. The two that fired constantly are repaired: a hook at every session start and a hook at every turn end, for every seat, each swallowing its failure whole. They now land through the in-process client and say on stderr when a write is refused.

Three call sites still name the address, and none of them is the silent case. One reads its failed read as a true empty, so the guard that stops a turn being forwarded twice can never fire — but no seat on this workstation states a recipient, so that guard is never reached. One reports the failure and retries, which is the behaviour the swallowing pair should always have had. One has no production caller at all.

# Evidence

First read on 2026-08-28 against `abe6a84f2`; re-read the same day against `373132e0b`, both on `main`, and run where running was possible. Nothing listens, still: `ss -ltn` shows no 8787, and `curl -s -m 3 http://127.0.0.1:8787/` returns `000` and exit 7, connection refused.

**The two that fired for every seat swallowed the failure, and are repaired.** `tools/hooks/agent-hook-local-agent-session-start.agent-hook.code.attachment.ts` had `originOf()` returning `process.env.PAGE_QUERY_ORIGIN` or the loopback, and `noteRotation` spawned `curl -s -m 2 -o /dev/null -X POST ${originOf()}/patch/seat/<seat>` with `stdout: "ignore"` and `stderr: "ignore"`, inside `try { … } catch { return }`. `Bun.spawnSync` returns an exit status that was never read, and the body was already sent to `/dev/null`, so `rotated-session-uuid` reached no seat page and nothing said so. `tools/lib/hook-decision-record.ts` held its own copy of `originOf()` and posted every seat-turn-end-decision row to `${originOf()}/write-row/seat-turn-end-decision/<name>` by the same ignored `curl` inside the same `try`/`catch { return }`.

Both now land through `tools/lib/page-query-client.ts`, which answers off the checkouts on this machine, and write the reason to stderr where a landing is refused. `record` and `noteRotation` became async, which carried into `tools/lib/turn-end-decide-call.ts` and the two inference hooks that call it. Landed at `fb6d23774`.

**That repair is measured, not reasoned.** The commit stands at `2026-08-28T09:09:38Z`. Two rows landed in `agent/seat/dalla.seat.turn-end-decisions.uncommitted.jsonl` at `09:09:53.601Z` and `09:09:59.618Z`, fifteen and twenty-one seconds later, one from `block-headless-halt` and one from `block-interactive-stall`. Before them the newest turn-end decision anywhere stood at `2026-08-27T21:53:35.153Z`, in `agent/seat/amy.seat.turn-end-decisions.uncommitted.jsonl`. Not measured: how many rows were lost between those two times.

**Nothing that arrived earlier reached these.** `tools/ops/page-queries-in-process.ts`, called from `tools/ops/cli.ts:29`, arms the `fetchThrough` seam inside `@shared/pages-query` for every `ops` command. None of these five call sites uses that package: four build a URL and dial it themselves, and the fifth is a shell script running `curl`. A reader who saw twelve `ops` commands recover should not read that as covering this.

**A failed read is read as a true empty, and the guard cannot fire — but nothing reaches it.** `tools/lib/forward-turn.sh:5` defaults `PAGE_QUERY_ORIGIN` to the loopback. At `:50-51`, `SENT=$(curl -s -m "$PAGE_PATIENCE" "${PAGE_QUERY_ORIGIN}/page/seat/${SEAT}" | jq … || echo "")` yields the empty string when nothing answers, and `:52` is `[[ "$SENT" == "$UUID" ]] && exit 0`. An empty `SENT` never equals a real `UUID`, so the already-forwarded check answers "not forwarded" whether it was or not. The two failures compound: `:67-71` writes the forwarded uuid back through `patch-state` on the same dead origin and ends `|| true`, so the marker that would make the check match is never written either.

The earlier reading left it unmeasured whether a turn had in fact been forwarded twice. It has not, and cannot as things stand: `rg 'forwards-turns-to' agent/seat/*.md` matches no seat page, and `:22-23` reads that key and exits where it is unset, thirty lines before the first `curl`. So this is a live trap rather than a live fault, and it arms itself the moment one seat states a recipient.

**The one that says so.** `editor-extension/src/seat/observation-store.ts:25` imports the constant and `:152-153` builds `${options.origin ?? PAGE_QUERY_ORIGIN}/patch-state/…`. On a refused or a thrown write, `:187-195` calls `options.onError?.(…)` and returns *without* advancing `writtenKey`, under a comment naming advancing it as "the failure that hides itself". So the next identical observation is retried rather than judged already written. This is the behaviour the other four should have. Not measured: whether the extension wires `onError` to anything Alan sees.

**The asker built on the constant has no production caller.** `readouts/ask-over-http.ts:7` exports the loopback and `:66` exports `askOverHttp`. After `5d762fac6` repointed `tools/lib/daily-tracking/points-source-engine.ts` to `askHere()`, `askOverHttp` is reached only from `readouts/ask-over-http.unit.test.ts`; the two other hits in the tree are generated declarations under `shared/pages-access/dist/` and `shared/status-bar-access/dist/`. The module itself stays reached: `readouts/ask-here.ts:4` takes `answerIn` and `paramsIn` from it, and the editor extension takes the constant. So the function is unused code against `pages/repo/akasha-repo.repo.md:23`, while the file around it is not.

This was Answer Or Refuse on `pages/domain/pages-system.domain.md:34-42` — "Never read a missing source as an empty one", and "Never let a failed write return like a done one" — broken four times out of five in one direction. Two of those four are repaired; the third is unreached and the fourth is unused code. `pages/finding/page-queries-system/origin-name-carries-four-behaviours.finding.md:21` recorded these same loopback call sites as one of four spellings of the origin; this finding is about what each one does when the dial fails, which that one did not establish.
