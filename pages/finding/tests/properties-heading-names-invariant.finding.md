---
id: 25edb07c-9572-52f4-a960-6a26452fddfd
page-type-slug: finding
title: "Properties heading names invariant"
domain-slug: domain/global
---

# Claim

A heading on `domains/file-kinds/tests.md` names the concept its own act calls something else. The heading at line 23 is `## Properties`; the act two lines below reads "Assert the invariant that holds for every input the code admits". Ubiquitous Naming bars two names for one concept. The obvious repair is worse: `# Invariants` already stands as a task-section heading on nine documents, so renaming trades a local mismatch for a corpus-wide collision.

# Evidence

Raised by a review-instructions seat on `domains/file-kinds/tests.md`, which drafted the rename to `## Invariants`, rejected it on the same rule that motivated it, and recorded the reasoning in its report so a later reading does not re-derive it.

I verified the mismatch firsthand: line 23 is `## Properties` and line 25 is "**Assert the invariant that holds for every input the code admits, never a detail of the one at hand.**"

I did not verify the count of nine documents carrying `# Invariants`, and I did not look for a third name that would satisfy both. Nothing here measures whether any reader has been confused by the mismatch — the document passes every gate as it stands.
