---
id: f4010ca8-8003-528b-aedb-a0edef32ccb3
page-type-slug: finding
title: "Owned domain list reads as absent"
domain-slug: domain/global
---

# Claim

`tools/checks/domain-edges.ts` reads a persona's `championed-domain:` as absent when it is written as a list. A fixture with two list entries makes the field reader return null, so the check prints "names no `championed-domain:` at all" of a persona who named two. `documents-conform` catches the shape, so the corpus is protected and the misleading line shows only where someone runs the one check on its own.

# Evidence

Found by the dispatched `review-instructions` seat reading `refusals/persona-champion-names-another.md` on 2026-08-12, which built the list-valued fixture rather than reading the field reader.

No line of any refusal body reaches it: the fix is in the check.

Not measured: whether any other check reads the same key through the same field reader, and whether a list value has ever been written by hand.
