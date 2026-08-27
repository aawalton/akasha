---
id: bb2e418c-8bff-5d2f-b78b-901fe13f40a9
page-type-slug: finding
title: "Detail destination free text rots"
domain-slug: page-type/finding
---

# Claim

A finding's `--detail` field is free text with nothing to resolve against, so ten agent-harness closes recorded destinations naming a `rulings.md` container heading that a later split deleted, and nothing reports the dangling reference because there is nothing for the field to fail against — the same shape as the `file.ts:<line>` citations the no-historical-references rule prohibits: a reference whose subject moves without the reference noticing.

# Evidence

From project #17158 (status someday_maybe, live-on: deploy, domain finding), captured and never defined, no objective was ever written.

Measured by project-16927's manager while reading `finding/close.ts`: ten agent-harness closes recorded `--detail` destinations naming a `rulings.md` container heading that a later split deleted. Nothing reports a dangling destination, because the field is free text and there is nothing for it to fail against.

This is the domain's genus: the destination was correct when written, the split moved its referent, and the reference did not change. Same shape as the `file.ts:<line>` citations the no-historical-references rule prohibits, a reference whose subject moves without the reference noticing.

Deliberately not filed as a child of #16927. That project asks which exits exist and what each costs; the field that rotted records where a finding went, not how it left, and would be exactly as broken with one exit or with ten. Its fix turns on a question #16927 has no reason to answer: what a destination resolves against, a path, a heading, a page id, or a thing with no stable identity at all. Deciding that inside a running tree means designing it in a message.

The cheap moment was missed knowingly: #16940 was opening `close.ts` at the time this was measured, and the wall-clock cost of reopening it later was accepted over the correctness cost of designing a resolution contract under schedule pressure. #16940 was asked to state the free-text limitation in the docblock rather than leave the field looking designed; an unresolved field that reads as intentional is what kept this invisible for ten closes.
