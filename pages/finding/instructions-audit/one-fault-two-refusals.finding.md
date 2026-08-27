---
id: 895d8085-2fcc-57eb-9136-9a8d2d8ada7b
slug: one-fault-two-refusals
page-type-slug: finding
title: "One fault two refusals"
domain-slug: domain/global
---

# Claim

`tools/checks/refusals-bound.ts` raises two messages for one fault. It sweeps for unprinted documents over the same printed set that an unreadable call site fails to populate, so a slug named in plain sight at a call the check cannot parse is reported both as an unreadable call and as a document nothing prints. Before 2026-08-12 the second message was false on its face beside the first and offered "remove it" as one of two remedies.

# Evidence

Provoked by the dispatched `review-instructions` seat reading `refusals/refusal-document-unprinted.md` on 2026-08-12, in a scratch root holding a refusal document beside a call whose values are not a plain object literal. Both messages returned together.

That seat repaired the body so the second message is now true rather than false, and said plainly that this does not stop it being noise. Its proposed fix: hold a slug back from the unprinted sweep where a call site named it and could not be read. That is a change to the check, and `domains/tasks/code-harness/review-check.md` is the task for it.

Not measured: how often the two fire together on the live corpus.
