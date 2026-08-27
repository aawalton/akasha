---
id: 81a0e5f2-5ff8-5559-8b52-96d89cb21153
page-type-slug: finding
title: "Spare spelling unnamed"
domain-slug: page-type/refusal
---

# Claim

`refusals/email-message-unclaimed.md` names two spellings for an unnamed value and the walk can produce a third. Where a rule's own values hold of the declared filler, `tools/lib/rules-partition.ts` falls through to a character from `SPARE` repeated eight times, so the refusal can name a message spelled from `qqqqqqqq`. The paragraph names only the declared fillers and reads as though those are what a reader will see.

# Evidence

Raised by the reviewer seat `claude-refusal-archivist-flex-7-review-instructions`, reading `refusals/email-message-unclaimed.md` line by line on 2026-08-14. Its report is at `~/agents/claude-refusal-archivist-flex-7-review-instructions/review-email-message-unclaimed.md`.

That seat rendered the refusal through its printer with the holes filled as the check fills them, rather than reading the printer, and confirmed both holes land. It cites `tools/lib/rules-partition.ts` lines 29 and 66-69 for the fallback and `tools/lib/email-rule-set.ts` lines 53-56 for the declared fillers.

Corroboration from a second seat in the same pass: `claude-refusal-archivist-flex-6-review-instructions`, reading the sibling `email-message-space-unbounded`, built rules covering every fallback character the realiser can spell with and got a restricted walk, which is the same machinery seen from the other side.

It left the clause unwritten because whether the case earns one is a judgment about value rather than something an instrument settles.

I did not read either file or render the refusal.

Not measured: how often the fallback path is actually taken, which is what would decide whether a reader ever meets that spelling.
