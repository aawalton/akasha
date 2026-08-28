---
id: 87411f88-20a4-5fea-a641-b295f72235a8
slug: test-fixtures-in-completed-tasks
page-type-slug: finding
title: "35 rows in the completed-task records are test fixtures the sentinel sweep could not see"
domain-slug: domain/temper
---

# Claim

35 rows in Alan's completed-task records are test and probe fixtures rather than completions he made. They carry no sentinel instant, so the sweep that found the 29 fabricated rows by their `1700000000` stamp could not see them: each holds a real-looking `completed-at` spread across four months, and only the title says what it is.

# Evidence

Run on 2026-08-20 against the working tree, not read.

Counted over the completed-month sidecars under `temper/completed-months/`. By month: 2026-04 holds 26, 2026-07 holds 7, and 2026-05 and 2026-06 hold one each.

By title: 20 read `[#8781 smoke <timestamp>] task 1` through `task 5` over four separate runs, 5 read `[#8781 probe <timestamp>] task 1` through `task 5`, 7 read `Verify scribing source: <name>`, and one each reads `Test`, `automation_action_complete probe (#9787)` and `ZZ-smoke-temper-<timestamp>`.

Each was filed against a matching `temper-task` row bearing the same fixture title. Of those task rows, 15 are soft-deleted and 5 no longer exist at all, so the tasks were cleaned up and the completions they produced were not.

All 35 sit inside the 516 completions carrying no `task` backlink, and all 35 remain in that set after the 262 recoverable backlinks were restored, because no live task file carries a fixture title to match them to.

They are distinct from the 189 rows that name a real but deleted task, and from the 29 rows already removed from a fabricated `2023-11`: those carried the fixture constant `1700000000` as their instant, which appears nowhere in the corpus now.
