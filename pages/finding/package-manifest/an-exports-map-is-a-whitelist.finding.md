---
id: 4c7a0e87-3954-59d5-800b-71125f33cb12
slug: an-exports-map-is-a-whitelist
page-type-slug: finding
title: "Giving a package its first exports map is the most narrowing edit available, not the additive one it reads as"
domain-slug: domain/package-manifest
---

# Claim

A package carrying no `exports` field resolves every internal path; the moment one is given, everything the map does not spell stops resolving. So where a package already has a map, adding `"./*"` beside `"."` is genuinely additive and safe. Where a package has none, adding one is never additive, and every existing importer has to be resolved first.

# Evidence

Observed 2026-08 in `code` and `instructions`.

`@shared/cli` had no `exports` at all, and `@shared/cli/src/ops/provenance` had resolved through it since 2026-08-21; giving that package a map invalidated a five-day-old importer that nothing had touched. Two packages were narrowed this way, `@shared/cli` and `@temper/game-trading-addon`. Both turn out to have no real importer of an excluded path, and that is worth nothing: neither was checked before the edit, so the outcome was luck, and luck audited afterwards is not a control.

The tree-property check in use read a missing `exports` field as an empty whitelist, which is how `@shared/cli` came to be on a repair list at all; the repair then created the breakage the false reading had claimed. The instrument is corrected — a package with no `exports` resolves everything, so nothing it names can fail. Why that reading happens, and the rule that stops the next one, is bound by `finding/agent-harness/absence-read-as-an-answer`.

What settles a batch is a property rather than a log: every specifier naming a workspace package must resolve against that package's `exports` map. Checked over both repositories and akasha that is 6,624 specifiers. The check found the 98 that did not resolve, in fifteen packages, and after the repair all 6,624 resolve. It is the thing to run after every batch, not the batch's own report of what it did.
