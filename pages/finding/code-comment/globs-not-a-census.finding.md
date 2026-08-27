---
id: b1d713f9-ed74-5ae0-a36f-4aecd3f0c9ab
page-type-slug: finding
title: "Neither of the code-comment domain's two path lists is a census of what it reaches"
domain-slug: domain/code-comment
---

# Claim

`domains/code-comment.md` reaches the two repositories through different lists. `code-path:` names 21 extensions, five of which (`jsx`, `mjs`, `cjs`, `bash`, `timer`) match nothing in the code repository. `instructions-path:` names five, of which `service` and `timer` match nothing there, while 10 tracked `.yaml` files in the instructions repository carrying comments go unreached. Neither list is a census of what either repo holds.

# Evidence

Counted during the review-instructions reading of `domains/code-comment.md` on 2026-08-19, by matching each glob against the tracked files of both repositories.

Measured: which extensions in each list match nothing, and the 10 unreached `.yaml` files. Not measured: whether the unreached files carry comments the rule would refuse, and whether the two lists were meant to be one — widening either grows what every reader of the domain pays for at boot, which is a call rather than a count.
