---
id: 2b44da4b-4164-5d05-be83-bd081337ce52
slug: books-corpus-acquired-twice
page-type-slug: finding
title: "Books corpus acquired twice"
domain-slug: domain/global
---

# Claim

The books corpus is now acquired twice in CI by two unrelated mechanisms, and the newer one's argument was that private acquisition is the cost worth avoiding.

# Evidence

#18905 added `preparation-books-tree`, which clones books once per pipeline run and names it to every step pod through `BOOKS_ROOT`. Its case for doing that pod-wide rather than scoping it to the one step that needed it rested on what scoping had already cost this repository: `check-cli-help-flag-references` cloned the instructions tree privately, and every later instrument would have done the same.

`packages/infra/ci/slow-suite-sweep/k8s/synth.ts` was already doing exactly that for books. Line 144 clones it to `/work/books` and line 216 sets `BOOKS_ROOT=/work/books` on the sweep's own pod. It is a CronJob rather than a pipeline step, so `buildPodEnv` does not reach it and the two do not contradict each other — but it is a second acquisition of the same corpus, on a different key, that the new route did not subsume and that the project's own reasoning did not name.

Whether the sweep should be moved onto the shared tree is the question. `/ci-storage` is a hostPath, node-local at `/var/lib/ci-storage`, so a sweep pod on another node would see nothing there — which may be the reason it clones its own, or may be nobody having asked.

Observed 2026-08-12 on the deployed system: one pod in the cluster carries `BOOKS_ROOT`, `slow-suite-sweep-29775437-sqdlq`, and its value is `/work/books`.
