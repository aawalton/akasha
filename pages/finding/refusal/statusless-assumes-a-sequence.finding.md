---
id: e95cd9cb-1714-5b64-88c2-de88e5ae6f86
slug: statusless-assumes-a-sequence
page-type-slug: finding
title: "Statusless assumes a sequence"
domain-slug: page-type/refusal
---

# Claim

A project task may legally state `# Loop` instead of `# Sequence`, `tools/document/schemas/task.ts` taking exactly one of the two. A document written that way reaches `refusals/task-sequence-statusless.md`, which then tells its reader about a `# Sequence` the document does not have.

# Evidence

Found by the dispatched `review-instructions` seat reading the document on 2026-08-12, which planted such a document with well-formed statuses under `# Loop` in a copy of the repo and drove the check to this body.

It left the clause out: no such document has ever existed, the first clause still points at the right section, and a clause for an imagined case is what Cut The Obvious and Parsimony are against.

Not established: whether a project task under `# Loop` is a shape anyone intends to write.
