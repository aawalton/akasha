---
id: e324c20e-5aa6-529c-90b6-12cd68310bf0
page-type-slug: finding
title: "Capped log no marker"
domain-slug: domain/ops-cli
---

# Claim

In the ops CLI, `ops voice logs`, `ops inbox-tracking logs`, and `ops temper watcher logs` each cap output with `records.slice(0, limit)` and report `count` as the post-cap length, with no `truncated` field, no stderr advisory, and no mention in `--help`, so a capped log reads identically to a complete one.

# Evidence

From project #16423 (domain `ops-cli`, status `someday_maybe`), filed by the worker on #16406 while sweeping for orphaned secret-checksum machinery. Never carried an objective — this is its capture.

Named sibling of #16388, which fixed the entity-surface list family, but a different defect class with a different core: do NOT assume the #16388 fix reaches these three verbs.

The defect: `ops voice logs`, `ops inbox-tracking logs`, and `ops temper watcher logs` each do `records.slice(0, limit)` and emit `{ lines, count }` where `count` is the post-cap length. No `truncated` field, no stderr advisory, no mention in `--help`. Per `.claude/docs/unix-philosophy.md:47-59` (Announce Every Bound), silence about a bound is a claim of completeness, and a truncated log greps as absence.

Why it is a separate row from #16388: different core entirely. #16388 changed `runEntityList` (`packages/shared/pages/cli/src/entity-surface/verbs/list.ts`) plus two bespoke project paths; these three verbs share none of it. Their output shape is `{ lines, count }`, not `{ pages, truncated }`, so the envelope decision is its own call — reusing the `truncated` field name is the obvious move but `count` is already ambiguous (post-cap length) and probably wants renaming or splitting into shown/scanned.

Reusable from #16388: `packages/shared/pages/cli/src/entity-surface/list-bound.ts` exports `splitOverfetched` and `listTruncationAdvisory` as pure helpers, and the over-fetch technique (ask for cap+1, drop the probe row) gives an exact truncation verdict rather than the ambiguous `length === cap` heuristic. Whether these log verbs can over-fetch depends on their source — check before assuming.

Acceptance, sharpened: two-sided per verb — marker present when the cap is hit, absent when it is not, in both output modes, exit code unchanged. Include the empty-but-truncated case if reachable — zero results is what reads most strongly as absence.

Cross-ref: #16388, #16381.
