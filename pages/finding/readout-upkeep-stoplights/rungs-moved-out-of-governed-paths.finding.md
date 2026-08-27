---
id: f580435c-c852-5941-8943-255a3dd9abea
page-type-slug: finding
title: "Rungs moved out of governed paths"
domain-slug: domain/global
---

# Claim

Every rung and baseline the upkeep circles are drawn from now stands in five SQL functions that `domains/readout-upkeep-stoplights.md` does not govern, and its `code-path:` already carries the five globs the schema admits.

# Evidence

Measured 2026-08-15, after #18909 deployed at `e2b5ef960cef`. `ops instructions governs --file-path packages/shared/supabase/database/schema/public/functions/get_capacity_stoplight.sql` names nine documents and `domains/readout-upkeep-stoplights.md` is not among them: what governs it is `code.md`, `code-quality.md`, `code-comment.md`, `database.md`, `storage.md`, `infra.md`, `global.md`, `foundational-layers.md` and `repos/code-repo.md`, none of which says anything about what the circles mean.

The five functions are `get_plants_stoplight`, `get_sleep_stoplight`, `get_hygiene_stoplight`, `get_capacity_stoplight` and `get_safety_stoplight`. They read the rungs and the plant baseline off the `readout-upkeep-stoplights` row, and before this project the same ladders stood in `packages/shared/status-bar-access/src/upkeep-*.ts`, which that domain's fifth glob does match. So the governance did not lapse; the subject moved out from under it.

The domain's `code-path:` holds exactly five entries and `tools/document/schemas/domain.ts` caps a glob list at five, so a sixth cannot be added without one leaving. The two that look combinable are not: `packages/alanwalton/native-shell/ios-widget/UpkeepStoplightsWidget.swift` and `packages/*/native-shell/ios-widget/SafetyLevelWidget.swift` widen to `*Widget.swift`, which also matches `InboxStoplightsWidget.swift`, `PersonaStoplightsWidget.swift`, `ValuesStoplightsWidget.swift`, `ProjectCountsWidget.swift`, `ClaudeUsageWidget.swift`, `PipelineHealthWidget.swift` and `CategorizeWidget.swift` across two packages — readouts this domain has no claim on.

What is not readable from here is which of the six areas is least this domain's own, or whether five is the right cap for a domain whose subject sits in six places. Both are decisions rather than observations, and one of them is Alan's.
