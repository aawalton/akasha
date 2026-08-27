---
id: cf5dfa88-de93-5771-b337-c706c1b7af1a
slug: one-defect-draws-two-refusals
page-type-slug: finding
title: "One defect draws two refusals"
domain-slug: domain/domain-championing
---

# Claim

A domain naming several parents, no `domain-owner:` and no `persona-champion-slug:` of its own draws two refusals from `domain-edges.ts` for one defect — `domain-parents-unranked` and `domain-unowned` — because the second arm reads the ownership the first arm's absence is what breaks.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `refusals/domain-parents-unranked.md` dispatched from `review-documents`. The reading raised it; the two arms were read here.

`tools/checks/domain-edges.ts` runs two independent loops over one frontmatter map. The first pushes `domain-parents-unranked` where `parents.length > 1` and `domain-owner:` is null. The second pushes `domain-unowned` wherever `ownerOf(relPath, corpus)` returns null.

They are not alternatives. The same reading established with fixtures that an unranked document carrying no persona of its own returns null from `ownerOf` — `below()` yields no edge at all rather than a choice between two — so both conditions hold at once and the author is handed two bodies for one missing key.

It is the ordinary case rather than a corner. A document declaring its own `persona-champion-slug:` escapes the second arm, and four live documents stand in that shape: `alan-harness`, `code-harness`, `folders/atlas-app` and `folders/design-system`.

The same reading repaired the unranked body, which had said the walk "has that many edges to descend and no way to rank them" — false twice over, since the descent stops rather than choosing, and a document with its own persona never reaches its parents at all. It also mended the check's own header, which said such a domain "is reached by both walks with neither wrong", where `owns-roster.ts` counts a null owner into `unchampionedDomains` and enters it in no persona's `ownedBy`, so it is reached by neither.

Whether the check should suppress the second where the first has fired is a call about what it reports, which is why the reading left it.

Not measured: whether any live document is in the doubled state today — `domain-edges` passes over 547 documents — or whether other pairs of arms in this check overlap the same way.
