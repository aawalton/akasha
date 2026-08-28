---
page-type-slug: finding
title: "A page may delete its own identity and land"
domain-slug: domain/checks-system
---

# Claim

`pages/page-type/page.page-type.md:18` states "A page's identity is a uuid, unique across every store." Nothing enforces it. A page may delete its own `id` and land, and no check in the repository is even addressed to the question.

This is not a gate standing down. It is a stated invariant that never had a check, so restoring the four gates that are off would not close it.

# Evidence

Found by reading fifteen check pages and noticing that one had no `id:` line where fourteen did.

`checks-system/check/inbound-import-resolves/inbound-import-resolves.check.md` was born at `9d15f9129` carrying `id: 32ce2445-bcce-5582-9c6c-347b54b074b8`. The next commit to touch it, `0f1438bd6` — "look only at what this change takes away", whose subject is the scan's scope and not the page's identity — deleted that one line along with the Definition rewrite it was actually for. The uuid was not moved, renamed or reassigned; nothing in the repository has held it since.

Six commits then passed over the file without noticing:

    0f1438bd6  the uuid is deleted
    ae9863a28  Definition and Design rewritten
    ad5e04f09  the stand-down sets check-on-patch false
    a9b88cb0a  the page type is renamed mp-check -> check, frontmatter rewritten
    d7b421452  the folder is renamed to its domain, the file moves
    b13bbfb2f  check-on-patch set true again — mine, with the frontmatter open

Two of those rewrote the frontmatter block the missing key sits in. One is mine from last night, six hours ago, editing line 6 of an eight-line frontmatter without seeing that line 2 was absent.

POSITIVE CONTROL. The uuid was restored at `592d8fd68`. The same body with the `id:` line stripped again was then put to `ops write --dry-run`:

    gate: 9 akasha check(s) over 1 changed file(s), none refused
    write:  dry-run — 1 file(s) would be written
            ...check.md  629 -> 588 bytes (-41)

Nine checks gate a patch today. A page deleting its identity passes all nine.

WHY NO CHECK REACHES IT. There is no `id` property definition in the repository — no `*.property.md` names it — so it is not among the properties `page-holds-to-its-type` judges a page against, and that check never names `id` in its code. `id` is structural, read by the page parser, and declared by no page type as required of anything. So the four gates standing down are not the explanation: turning all four back on would still not refuse this patch.

NOT MEASURED. How many other pages have lost an id the same way. The one instance here was found by eye over fifteen files, not by a sweep, and the sweep is the obvious next measurement.
