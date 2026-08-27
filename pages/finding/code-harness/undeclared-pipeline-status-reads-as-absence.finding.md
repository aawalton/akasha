---
id: d4436251-ba3e-54ef-bed4-6d131190992a
page-type-slug: finding
title: "A pipeline status nothing declares reads as a plausible wrong answer"
domain-slug: domain/global
---

# Claim

`emit-main-pipeline-requested.ts:65` queries pipelines with `status: "completed"`. `completed` is not one of the eight statuses the property document declares. Against rows this matched something; repointed onto files it matches nothing, silently, and `resolvePriorMainSha` then falls through to `git rev-parse` and returns a sha that looks right and is not.

# Evidence

Measured 2026-08-20 while repointing `packages/infra/ci/**` off the database.

`properties/pipeline-status.md:8-16` declares `pending`, `dispatching`, `running`, `passed`, `failed`, `answered-elsewhere`, `overtaken` and `canceled`. `completed` is absent.

The failure has no loud edge anywhere along it. A narrow naming a value no page states matches zero rather than refusing, the caller reads zero as an honest absence, and the fallback produces a well-formed sha. Nothing along that path reports that the question was unanswerable rather than answered in the negative.

A raw sweep of this tree finds 454 occurrences of status vocabulary that the pipeline page type does not declare. That is a starting population and not a verdict: most are merge-queue batch states, which are a different vocabulary under a different page type and legitimate there. One instance is confirmed live and it is this one. Partitioning the rest by which page type each belongs to is the work; treating the 454 as defects would be as wrong as treating them as clean.

This is why a bulk repoint of the twenty-two remaining callers is unsafe. Each call site needs the same question asked of it — whether the value it names is one the page type declares — and the answer is invisible to a compiler, because both the wrong string and the right one typecheck as `string`.

A page type that declared its status as a closed set the query layer could check would make this loud instead. Whether the declaration should bind a query, rather than only a written value, is a design question rather than a defect in this call site.
