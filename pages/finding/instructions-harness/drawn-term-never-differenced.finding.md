---
id: a58280e7-87b1-55fc-b148-295b4a7c1554
page-type-slug: finding
title: "Drawn term never differenced"
domain-slug: domain/global
---

# Claim

A drawn-in term arrives whole on every read while the reader's own files are differenced, and nothing states that the two are read differently.

# Evidence

`tools/lib/drawn-in.ts:114-117` states it: "IT GOES WHOLE EVERY CALL rather than being recorded and differenced against. A drawn document moves without the documents naming it moving, and a reader told one of those is unchanged would otherwise hold a definition that had changed underneath them and be told they were current — the one failure this verb exists to make unreachable."

That is a decision, and a good one, but the read verb's own help sets the opposite expectation for everything else it hands back: "The whole file the first time you read it; one line saying so and nothing else where it has not moved since; and the difference from what you last read to what is on disk where it has." A reader who has learned that rule from the files they asked for meets a drawn term restated in full and has no way to tell whether it moved.

Grepped `domains/` for the claim: nothing states how a drawn-in document is read. `domains/domain-glossary.md` says a glossary holds slugs and no text of its own, that a term stands in whatever folder its kind is filed in, and that a reader is given each named domain's Definition and its Design. None of the three says the giving is unconditional.

Filed against `instructions-harness` rather than against a domain-system document deliberately: the claim is about what the read verb hands back, not about what a glossary is. If it belongs on `domains/domain-glossary.md` after all, that is ryn's to take.
