---
id: 31f38cef-eea7-56b3-91fa-4111a439bccd
slug: one-identity-admits-one-seat
page-type-slug: finding
title: "One identity admits one seat"
domain-slug: domain/agent-harness
---

# Claim

A seat's name is composed from its identity and `seq` is the only axis separating two seats of one persona, domain and role, so a fan-out needing several seats on one identity must invent a project row apiece or cannot be spawned at all.

# Evidence

Measured 2026-08-04, firsthand, while dispatching a diagnostic fan-out over `tasks/lead/define-principle-or-rule.md`: one seat per candidate finding, every one on persona `claude`, role `lead` and task `define-principle-or-rule`, differing only in domain.

Two of the five candidates sat in `code-harness`. Passing `--name` to separate them was refused, verbatim: "--name 'case-verification-ceiling-contested' disagrees with the identity stated beside it, which spells 'claude-code-harness-lead'. A seat's name IS its identity (domains/identity.md), so the two cannot both be true of one seat. Drop --name and take the composed spelling, or state the axes that actually spell the name you want."

`ops seat start --help` states the constraint under `--seq`: it "is the last segment of the composed name, and the only thing telling two seats of one domain and role apart."

`domains/identity.md` L17 holds why: the name "is deterministically composed from the identity when a seat is minted and never rewritten afterwards" and "serves display, communication and routing distinctness alone". L21 adds a consequence past the label — "one carrying a seq lives while its row does" — so borrowing `seq` to separate two seats also binds each seat's lifetime to a row.

The one differentiator therefore costs a project row per seat. For a fan-out that is diagnostic rather than dispatched — N readings of one document, landing nothing, retiring on hand-back — cutting N rows manufactures work-tracking to satisfy a naming rule.

The workaround was to drop one candidate and substitute another in a different domain, which changed what was measured to fit what could be spawned.

Not measured: whether two spawns with identical axes and no `--name` are refused or silently collide — the `--name` refusal was executed, that case was worked around rather than run. Also not measured: whether `--seq` accepts a value naming no row, though its help says it resolves against no corpus and is checked for shape alone.
