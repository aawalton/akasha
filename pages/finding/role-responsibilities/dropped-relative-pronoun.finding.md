---
id: 5bff7d26-f971-55aa-8b3f-87f2cf488df2
page-type-slug: finding
title: "Dropped relative pronoun"
domain-slug: domain/global
---

# Claim

The one rule description on `domains/role-responsibilities.md` drops a relative pronoun. It reads "A cut a dispatched review lands is not a changed line." The repair is "A cut landed by a dispatched review is not a changed line." A reviewer landed exactly this rewrite at a7b20606 and reverted it at f3ee8a71 on discovering that `domains/domain.md` governs `domains/*.md` unconditionally rather than section-scoped, so Every Changed Line bound the line and Alan had not seen it.

# Evidence

Raised by a review-instructions seat on `domains/role-responsibilities.md`, which reported the sequence in its own words: it landed the rewrite, re-ran `ops instructions governs --file-path domains/role-responsibilities.md` at stage 3, found `domain.md` listed unconditionally because the subject sits at `domains/*.md` which that document's own `instructions-path` matches directly, and reverted. The document now stands as Alan last approved it with only the date moved.

I did not re-run `governs` on that path or read the two commits. I did verify the line reads as quoted.

This is the sixth subject this pass to reach Every Changed Line and the first where a reviewer landed inside a guarded section and then took it back on its own. Not measured: whether the rewrite is an improvement — the reviewer judged it worth having and put it to the principal rather than deciding.
