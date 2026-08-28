---
id: df206954-be2c-5945-a986-eef894108e4d
slug: empty-and-blind-render-alike
page-type-slug: finding
title: "Empty and blind render alike"
domain-slug: domain/temper
---

# Claim

Temper's inventory reporting surfaces declare success off a bare zero-length check, so an empty result and a blind one render identically.

Neither carries a denominator. `plan` prints "(no actions pending)" when its row list is empty, and `capacity-audit` prints "No capacity overflow — every destination fits" when its entry list is, neither saying what was examined. A dropped condition once matched 4,129 of 4,453 items and swallowed the whole inventory while both read green and nothing errored.

# Evidence

Three sites, all reached by a bare length test on an already-collected list.

`packages/temper/player/inventory-management/cli/src/temper/inventory/plan.ts`, in `formatPlanText`: `if (rows.length === 0) return "${PLAN_HEADER}\n  (no actions pending)\n"`.

`packages/temper/game/items/rules/routing/src/inventory-plan-checklist.ts`: `if (plan.sessions.length === 0) return "${HEADER}\n  (no actions pending)\n"`.

`packages/temper/player/inventory-management/cli/src/temper/inventory/capacity-audit.ts`, in `formatAuditText`: `if (audit.entries.length === 0)` returns "No capacity overflow — every destination fits." That one asserts a conclusion about every destination from an empty list.

None reports how many items, rules or destinations were considered, and none names anything it could not see. The output is identical whether the collection ran over the full inventory and found nothing to do, or never received it.

The estate's own instruments do carry this. `check-source-position-citations` closes with "[over 1736 of 1736 markdown files] [repos: code-repo UNMEASURED, instructions 1736, books UNMEASURED, memory UNMEASURED]" and prints a "not detected by this scan:" list of six named holes every run. `ops project list --help` separates `.returned`, `.count` and `.truncated` and says "Treat a truncated result as partial, never as an absence." The pattern exists here; these three surfaces sit outside it.

The incident survives only under quarantine, at `dirty/skills/temper/SKILL.md` lines 120-123: "both green — while a dropped condition matched 4,129 of 4,453 items and swallowed the entire inventory. Nothing errored. An empty plan and a blind plan render identically." That document is queued for removal.

Not measured: whether the dropped condition itself was fixed. `inventory-management-plan-capacity-audit.unit.test.ts` pins `applyDestinationCapacityFilterWithAudit` reporting dropped items on a capacity overflow, which covers the capacity path only. Whether a denominator is the right repair was not considered.
