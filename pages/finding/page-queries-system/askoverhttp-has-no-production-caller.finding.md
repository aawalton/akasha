---
page-type-slug: finding
slug: askoverhttp-has-no-production-caller
title: "askOverHttp is reached only by its own unit test, while the module around it stays reached"
domain-slug: domain/page-queries-system
---

# Claim

`askOverHttp`, exported from `readouts/ask-over-http.ts:66`, is reached by no production caller: its only remaining call site is its own unit test. The module around it stays reached, so the file is not dead, but the function is unused code against `pages/repo/akasha-repo.repo.md:23`.

# Evidence

Read on 2026-08-28 against `abe6a84f2`, re-read the same day against `373132e0b`, both on `main`.

`readouts/ask-over-http.ts:7` exports the loopback constant `http://127.0.0.1:8787`, on which nothing has listened since the page query service was deleted, and `:66` exports `askOverHttp`.

After `5d762fac6` repointed `tools/lib/daily-tracking/points-source-engine.ts` to `askHere()`, `askOverHttp` is reached only from `readouts/ask-over-http.unit.test.ts`. The two other hits in the tree are generated declarations under `shared/pages-access/dist/` and `shared/status-bar-access/dist/`.

The module itself stays reached: `readouts/ask-here.ts:4` takes `answerIn` and `paramsIn` from it, and `editor-extension/src/seat/observation-store.ts:25` takes the loopback constant from it. So the function is unused code against `pages/repo/akasha-repo.repo.md:23` — "This repository contains no unused code" — while the file around it is not.
