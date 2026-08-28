---
id: 095016c9-121a-5c0c-a08f-51b600d49524
page-type-slug: finding
slug: origin-name-carries-four-behaviours
title: "One name spells the query service's origin three ways, and the newest means the opposite of the other two"
domain-slug: domain/page-queries-system
---

# Claim

`pageQueryOrigin` and `PAGE_QUERY_ORIGIN` name three behaviours here, and no two agree on what a caller configuring nothing should do. One returns a cluster address that no longer resolves. One returns a loopback address nothing listens on. The third reads the same variable to mean the opposite — stand down, install nothing — and governs every `ops` run. Two behaviours this finding recorded, the refusal and the deleted-page lookup, are gone.

# Evidence

Re-read 2026-08-28 against `150a81cdb`.

**One, it dials the cluster.** `shared/pages-query/src/index.ts:46-52`: the stated variable (`:28`), else browser origin plus `/api` (`:50`), else the constant (`:9-10`). `ask.ts:88,133,188,237,272` and `index.ts:117,179` build every URL from it. Changed: the hostname no longer resolves — `getent hosts` prints nothing, exit 2, where this finding recorded 10.100.134.88.

**Two, it dials loopback.** `readouts/ask-over-http.ts:7`, a bare `http://127.0.0.1:8787`, reached by `editor-extension/src/seat/observation-store.ts:25,153`; `tools/lib/forward-turn.sh:5` defaults the same and curls it at `:50,68`. `curl -m 3` returns 000, nothing bound to 8787. One consumer fewer: `daily-tracking/points-source-engine.ts` now uses `askHere` at `:17,264` (`5d762fac6`).

**Three, it means stand down.** `tools/ops/page-queries-in-process.ts:23-25` installs nothing where the variable is set, and the in-process fetcher at `:26-28` only where it is unset. `tools/ops/cli.ts:29` runs it on every `ops` invocation (`ff4d43cbd`).

**Gone, it refuses.** `tools/lib/page-query-client.ts` holds no `pageQueryOrigin`, `PAGE_QUERY_ORIGIN` or `process.env`. Its callers `services/daily-tracking-points.ts:42` and `services/great-courses-sync.ts:39` call `fetchThrough(pageQueryInProcess)` (`5d762fac6`).

**Gone, it reads a deleted page.** `rg 'PAGE_QUERY|pageQueryOrigin|clusterOriginOf' tools/lib/ci-container-dispatcher/` returns nothing (`f3a52ce96`). Only the lookup went: `buildContainerPayload` still runs from `launch.ts:143`. The page stays absent and `service-cluster-reach.ts:136-139` still holds `clusterOriginOf`, aimed at nothing.

**Plumbing, not a sense.** `ci-pod-dispatcher/pod-spec-env.ts:58` sets it from an argument and `callback-shell.ts:29` wgets it, but its entry `buildRunToCompletionPodSpec` (`pod-spec.ts:38`) has no caller, so no value is supplied.

**The meeting point is gone.** This finding closed saying `hook-decision-record.ts:17` and the session-start agent hook read the variable directly. Neither mentions it now; the hook's comment at `:8` records the dial removed.
