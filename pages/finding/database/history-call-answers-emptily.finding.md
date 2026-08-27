---
id: 2ec89d11-4d98-5b06-bcae-406b2f6ea57b
slug: history-call-answers-emptily
page-type-slug: finding
title: "History call answers emptily"
domain-slug: domain/database
---

# Claim

A history call against a type that was never versioned exits clean and returns nothing, so a type with no versioning is indistinguishable from a versioned type that has not yet changed.

# Evidence

The claim stood on `domains/database.md` as part of its `# Vision` until 2026-08-05, written as a settled fact. It was cut in the pass that produced this finding, on the same reasoning as `pages/finding/object-store/listing-truncates-and-exits-zero.finding.md`: a query interface that answers emptily instead of refusing is something discovered about the machinery rather than a decision the domain took, so cutting it without filing it would have destroyed the only record.

NOT REPRODUCED BY ME. I did not make a history call against either kind of type, and I did not write the original claim. Whoever picks this up should reproduce it first.

WHY IT MATTERS IF TRUE. `Population` on `domains/instrument.md` requires an instrument to state what it measured and to fail where it could not measure anything, because one that looked at nothing exits beside one that found nothing. This defeats that from underneath. An agent asking what changed on a row, and getting a clean empty answer, has been told two very different things in one shape: nothing has changed, or nothing is being recorded and never was. Acting on the first reading when the second is true means treating an unaudited type as an audited one.

`domains/database.md` now carries a Design entry stating that versioning is opted into per type and most types do not have it, which is the standing fact this observation is about. The stated list of which types carry versioning is what makes the distinction recoverable; this finding is that the call itself does not make it.

THE SECOND INSTANCE IN ONE DAY. The object-store finding is the same failure at a different layer — a recursive listing returning a prefix of the keyspace and exiting zero. Two stores answering partially and cleanly, found within an hour of each other while reading their visions, is worth someone asking whether it is a pattern across the stores rather than two coincidences.

Code that would settle it: `packages/shared/supabase/**`, which `domains/database.md` declares in its `code-path:`.
