---
id: 9b6950cf-2e1d-56d4-a638-e493f7dfef52
slug: no-allowing-question-for-a-turn-ending-on-a-question
page-type-slug: finding
title: "No allowing question for a turn ending on a question"
domain-slug: page-property-definition/seat-turn-end-reading
---

# Claim

The interactive reading has an allowing question for a turn that answers its principal and none for a turn that asks him one. A turn ending on a question to Alan answers "did this answer a question the principal put?" with no, falls through to the refusing questions, and is blocked — though putting a question to him is the other legal way an interactive turn ends.

# Evidence

`domains/seat-turn-end-reading.md` states "An interactive reading asks whether the turn answered a question the principal put." `domains/alan-harness-agents.md` now states both endings in one rule: "Give Alan one question or one answer, then end the turn." So the reading allows half of what a rule requires, and the half it refuses is the half that costs a turn to recover.

Seat `sophia-persona-persona-craft` on 2026-08-15. Three blocks in one session, all on turns whose last words were a question to Alan:

- A turn ending "Does that rule text read right?" — blocked with "This turn ended with work outstanding and said nothing about why."
- A turn ending "Do you want the flat rule that retires the two commit build tracks, or the softer one?" — allowed.
- A turn ending "Read right?" — blocked with the same text.

`~/agents/hook-decisions-interactive/2026-08-15.jsonl` records both blocks as `judged` rather than as any deterministic arm, so this is the reading itself, not the engine's fields.

Alan had already called four blocks on this seat earlier the same day false positives, before the Hand Back rule existed. The rule makes the shape more common rather than less: an agent obeying it ends far more turns on a single question than one carrying work to a natural stopping point.

The refusal text is also wrong on its own terms. It says "Nothing will bring this seat back," where a question put to an interactive principal is precisely what brings it back — his answer is the next turn's start.
