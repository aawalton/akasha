---
id: c58966ca-1bd8-5c01-8eb3-b71fb42968df
page-type-slug: finding
title: "Two domain invariants landed without Alan seeing them"
domain-slug: page-type/domain
---

# Claim

Two commits on 2026-08-28 changed domain invariants without Alan seeing the lines, which Every Changed Line requires. The cause was a coordinating seat telling nine delegates that Design lines fall outside that rule. They do not: a domain design entry is defined as a domain invariant that holds now. The lines are recorded here verbatim so each can be ruled on rather than found later in a diff.

# Evidence

Observed 2026-08-28 by seat astra, whose brief caused it.

`pages/page-body-section/domain-design.page-body-section.md:12` defines a domain design entry as "a domain invariant that holds now", and `pages/domain/domain-invariant.domain.md:7-10` names domain-design, domain-condition and domain-intent as its three sections. So the rule at `pages/page-type/domain.page-type.md:53` reaches Design, Condition and Intent alike. Nine briefs said otherwise. Two delegates acted before the correction reached them; a third caught the error and reported it.

**`1f3c6db27` on `pages/page-type/view.page-type.md`.** A Design line changed from "A view names the page type it draws by id, and its properties by the key each property definition states" to the same sentence with "by slug". The whole Intent section was then removed, its text being: "A view names its page type and its properties by slug and key, so nothing has to resolve an id to draw it." The delegate read Resolve When Found as obliging deletion of an intent found true.

**`016bc82ff` on `pages/domain/page-queries-system.domain.md`.** Three Design lines added: "A browser reaches a page query under `/api` on the app own origin, never at a cluster name." "A row-write takes one pass over the file holding the rows, whether it carries one row or a batch." "A narrow the query cannot read is refused, never dropped."

The third may be false of the read path. `userId` where the page type declares no `owner-slug` is dropped at `shared/pages-access/src/file-narrow.ts:99-103` and never reaches `matches`. The write path does refuse, at `file-write.ts:117-118`.

Neither commit was reverted: the rule asks that he see the lines, not that they be undone.

Not measured: whether any such line landed before the scan that found these two.