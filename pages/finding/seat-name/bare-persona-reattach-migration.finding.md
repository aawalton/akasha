---
id: 37851f47-3f98-5754-b762-5425263c5522
slug: bare-persona-reattach-migration
page-type-slug: finding
title: "Bare persona reattach migration"
domain-slug: domain/seat-name
---

# Claim

#17327 retired the `bare-persona` name shape from `AGENT_NAME_FAMILIES`, so `an <persona>` with no role — documented first-class usage — now composes an undeclared seat name and takes the warn-and-degrade path: the nameless-seat window #17329 closes for `an <persona> <role>` stays open for the no-role form, and recomposing it to `{persona}-{role}` would silently change the reattach target for all 40 persona seats at once, with no migration between old and new.

# Evidence

Project #17333, domain `seat-name`, status someday_maybe, live-on deploy. Captured not defined.

Filed by `athena-intake` ruling on `deliver-17329`'s judgment departure; proposed the fix below; declined on Safety plus a measured fact.

`bare-persona` (shape `{persona}`) was removed from `AGENT_NAME_FAMILIES`, retired by the landed #17327: `isDeclaredAgentName("athena")` now false, `isDeclaredAgentName("athena-lead")` true, `isDeclaredAgentName("alan")` also true (a different family).

`an <persona>` with no role is documented first-class usage (`Usage: an <persona> [<role>]`), so the commonest form composes `_an_seat` as the bare slug, meets `undeclared-shape`, and warn-and-degrades. The nameless-seat window #17329 closes for the role form stays open for `an <persona>`.

From `bun ops seat list --all --limit 3000 --json` (sample of 3000 of 8491 rows, `truncated: true`, a lower bound): 40 single-token names, each once, all distinct — one canonical row per persona, the reattach target for that persona's no-role `an`. `_an_seat` is what `ops seat stop` and `mark-running` key on, so recomposing `athena` to `athena-lead` would change which row `an athena` reattaches to, for all 40 personas at once, with no migration between. The launcher already derives the role, so `athena-lead` composes today — the constraint is the 40 targets, not availability.

Own row, not #17329 scope: #17329's C2/call-5 binds `$_an_seat` as composed; recomposing contradicts it.

Defect in #17329 itself: its intent "A seat launched through `an <persona> [<role>]` holds `{persona}-{role}` before its first turn" brackets in the no-role form, promising coverage delivery can't give. `deliver-17329` caught it before building — that review's seventh criterion-authorship defect.

Unexplored: migrate the 40 rows, declare bare-slug reattach-only, or change what `an <persona>` composes.

Moved off the row's retired `notes` attribute on 2026-08-15.
