---
id: 24af063e-6989-5874-8434-33e4db4cced1
page-type-slug: finding
slug: five-callers-still-dial-the-dead-loopback
title: "Five callers still dial a loopback port nothing listens on, and only one of them says so"
domain-slug: domain/page-queries-system
---

# Claim

`http://127.0.0.1:8787` is still built into five call sites, and nothing has listened on that port since the page query service was deleted. They do not fail alike. One reports the failure and retries. Three swallow it: the write never lands and nothing anywhere records that it did not. One is worse than swallowing it — it reads its failed read as a true empty and acts on the answer, so the guard that exists to stop a turn being forwarded twice can never fire. Two of the five are hooks, which is what makes this worth filing: they run for every seat and every turn end, so the silent case is the common case.

# Evidence

Read on 2026-08-28 against `abe6a84f2` on `main`, and run where running was possible. Nothing listens: `ss -ltn` shows no 8787, and `curl -s -m 3 http://127.0.0.1:8787/health` returned `000` and exit 7, connection refused.

**It fires for every seat and says nothing.** `tools/hooks/agent-hook-local-agent-session-start.agent-hook.code.attachment.ts:10-13` has `originOf()` returning `process.env.PAGE_QUERY_ORIGIN` or the loopback. `noteRotation` at `:15-41` spawns `curl -s -m 2 -o /dev/null -X POST ${originOf()}/patch/seat/<seat>` with `stdout: "ignore"` and `stderr: "ignore"`, inside `try { … } catch { return }`. `Bun.spawnSync` returns an exit status that is never read, and the body was already sent to `/dev/null`. So `rotated-session-uuid` is never written to the seat page, and no log, no throw and no non-zero exit says so.

**The same shape, on every turn end.** `tools/lib/hook-decision-record.ts:17-19` holds its own copy of `originOf()`, and `record(verdict, reason)` at `:49-87` posts to `${originOf()}/write-row/seat-turn-end-decision/<name>` by the same ignored `curl` inside the same `try`/`catch { return }`. Every seat-turn-end-decision row is lost the same way.

**A failed read is read as a true empty, and the guard cannot fire.** `tools/lib/forward-turn.sh:5` defaults `PAGE_QUERY_ORIGIN` to the loopback. At `:50-51`, `SENT=$(curl -s -m "$PAGE_PATIENCE" "${PAGE_QUERY_ORIGIN}/page/seat/${SEAT}" | jq … || echo "")` yields the empty string when nothing answers, and `:52` is `[[ "$SENT" == "$UUID" ]] && exit 0`. An empty `SENT` never equals a real `UUID`, so the already-forwarded check answers "not forwarded" whether it was or not. The two failures compound: `:67-71` writes the forwarded uuid back through `patch-state` on the same dead origin and ends `|| true`, so the marker that would make the check match is never written either. Reached in production through `tools/hooks/agent-hook-forward-turn-to-recorder.agent-hook.md`. Not measured: whether a turn has in fact been forwarded twice on this workstation — only that nothing here would stop it.

**The one that says so.** `editor-extension/src/seat/observation-store.ts:25` imports the constant and `:152-153` builds `${options.origin ?? PAGE_QUERY_ORIGIN}/patch-state/…`. On a refused or a thrown write, `:187-195` calls `options.onError?.(…)` and returns *without* advancing `writtenKey`, under a comment naming advancing it as "the failure that hides itself". So the next identical observation is retried rather than judged already written. This is the behaviour the other four should have. Not measured: whether the extension wires `onError` to anything Alan sees.

**The asker built on the constant now has no production caller.** `readouts/ask-over-http.ts:7` exports the loopback and `:66` exports `askOverHttp`. After `5d762fac6` repointed `tools/lib/daily-tracking/points-source-engine.ts:266` to `askHere()`, `askOverHttp` is reached only from `readouts/ask-over-http.unit.test.ts`. The module itself stays reached: `readouts/ask-here.ts:4` takes `answerIn` and `paramsIn` from it, and the editor extension takes the constant. So the function is unused code against `pages/repo/akasha-repo.repo.md:23`, while the file around it is not.

This is Answer Or Refuse on `pages/domain/pages-system.domain.md:34-42` — "Never read a missing source as an empty one", and "Never let a failed write return like a done one" — broken four times out of five in one direction. `pages/finding/page-queries-system/origin-name-carries-four-behaviours.finding.md:21` recorded these same loopback call sites as one of four spellings of the origin; this finding is about what each one does when the dial fails, which that one did not establish.
