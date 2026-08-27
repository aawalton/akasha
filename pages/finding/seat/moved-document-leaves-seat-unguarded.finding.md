---
id: 72841497-0f83-5867-bb4b-efbfd3a53c0b
slug: moved-document-leaves-seat-unguarded
page-type-slug: finding
title: "Moved document leaves seat unguarded"
domain-slug: page-type/seat
---

# Claim

A seat's stated attributes resolve to paths, and when a governing document MOVES the seat keeps pointing at where it was — its hold-seat guarantee absent until somebody restates it by hand. Restating repairs everything at once and levies the new reads immediately, so the repair chain is sound. What is missing is the trigger. Nothing wakes the seat: the notice appears only inside a write's gate list, reads as `not-applicable` beside a dozen irrelevant gates, and the write proceeds.

# Evidence

Met on 2026-08-15 on the `amy` seat while filing an unrelated finding:

    [hold-seat]  not-applicable  this seat states 3 attribute(s) and 3 of the
    document(s) they name are no longer there (domains/person.md, domains/persona.md,
    domains/role.md) — nothing this agent may do while refused would restore them, so
    THIS GUARANTEE IS ABSENT for it until they are stated again

`tools/seat.ts --show` confirmed it: all three paths named under all three attributes. Each became `page-types/<x>.md` when it was made a page type.

THE REPAIR CHAIN IS SOUND, which is why this is about a trigger. Re-running `tools/seat.ts` with the same three values — no new information anywhere in the command — repointed every path, and the very next write was refused for not having read `page-types/person.md`, a document that had not governed me an hour before. Restating repairs the resolution and levies what the new documents owe, in one idempotent act.

WHAT IS MISSING IS ANYTHING SAYING TO RESTATE. The word on the notice is `not-applicable`, the same word a dozen irrelevant gates carry in that list, and the write SUCCEEDED. The sentence is well written and says exactly what is wrong and how to fix it — it is sited where a reader is looking for why their write was refused, not for news about themselves.

THE POPULATION IS EVERY LIVE SEAT. Those documents moved today, and every seat stating a persona, domain or role names at least one — one seat's three attributes named all three. Every seat up before the move that has not written since is in this state and cannot know it.

A boot-time mechanism for CHANGED documents exists and fired in this same session: eight `domains/seat-*.md` files whose bodies had moved on under the composed prompt, with the next act refused until each was re-read. A MOVED document produces no such notice — the prompt still carries the old body under the old path.
