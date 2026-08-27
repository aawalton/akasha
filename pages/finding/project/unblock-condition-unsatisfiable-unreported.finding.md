---
id: 923605d2-a035-5f27-9774-d7ad1c561da5
page-type-slug: finding
title: "Unblock condition unsatisfiable unreported"
domain-slug: barred-meaning/project
---

# Claim

An `unblockCondition` can be written unsatisfiable by construction and nothing reports it. A predicate of the form *no live agent predates X* is blocked on the fleet's own oldest seat, which never dies, so it has no reachable satisfied state — and it reads as a condition merely not met yet. `ops project sibling-dep-census` is the instrument for preconditions a tree cannot satisfy and reaches intra-tree `dependsOn` edges only.

# Evidence

A standing ruling of 2026-07-28, held in `dirty/skills/agent-harness/rulings/rows.md` and reached by an ingest seat emptying that source. Cut from the source as instruction rather than kept: an instrument that reported this would leave nothing for an instruction to say, so it is a defect in an instrument.

MEASURED FRESH, 2026-08-07, and the premise is true and harder than when written. `ops seat list --json --limit 300` returns 61 live seats; sorted by `created_at`, the oldest is `alan` at 1342 hours and the next, `athena`, at 299. The source says the blocker is "structurally the lead", measured at about twenty hours over nineteen seats. Today it is Alan's own seat, ahead by four and a half times — further from satisfiable, against a member that never leaves.

`ops project sibling-dep-census` reports "every intra-tree `dependsOn` edge whose asserted precondition the tree's own sequence cannot satisfy", and its own help says it "reports and never refuses". A condition ranging over fleet age is neither intra-tree nor a `dependsOn` edge, so nothing looks at it.

Neither field is reachable from instruction. Searched all of `domains/` for `dependsOn|depends on|unblockCondition|undispatched|already executing`: eight hits and not one names either field. No live task describes writing one.

Duplicate check, run as its own call: `rg -uuu -il "unblockCondition|unsatisfiable|never close|no reachable|oldest"` over `~/memory/findings/`, seven files. WHAT THIS ADDS over the two near ones. `instrument/gate-subject-causes-its-population.md` is a gate that cannot close because its own subject feeds the population it counts — a different mechanism. `project/sibling-order-unexpressible.md` reads `unblockCondition` only for what its presence or absence signals about a sibling edge, never for whether one can be written that no state satisfies.

NOT MEASURED: how many live rows carry an `unblockCondition` at all, or how many of those are unsatisfiable. I measured the fleet-age premise, not the population.
