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

THE SWEEP, AND WHAT IT DOES NOT SHOW. Every tracked page with frontmatter was then read: **80 of 58,992 carry no `id`**, in three page types — 59 findings of 3,068, 15 `story-chapter-royal-road` of 17,905, 6 messages of 68.

**Fifty-nine of those 80 are not instances of this claim, and should not be counted as such.** `tools/lib/finding.ts:117` composes a new finding's frontmatter from three keys — `page-type-slug`, `title`, `domain-slug` — and no `id`. `git log -S` over that file's whole history returns no commit that ever added one, so `ops finding create` has never minted a uuid. The idless findings did not lose an identity; they were never given one. All eight findings filed from this seat tonight, this one included, are among them.

That leaves the check page as the one demonstrated instance of an id being **deleted** by an edit. The claim above stands on it and on the positive control, not on the sweep.

WHAT THE SWEEP FOUND INSTEAD is a disagreement between two page types. `pages/page-type/page.page-type.md:18` says a page's identity is a uuid. `pages/page-type/finding.page-type.md:22` says "A finding is keyed only by domain and file stem." `finding` extends `page`. Either the parent's line does not bind findings — in which case it is written as though it binds every page and does not — or it does, and the sanctioned command for creating findings has been minting non-conforming pages for its entire history. Nothing in the repository decides which, because nothing checks either line.

NOT MEASURED. Whether the 15 chapters and 6 messages are losses or the same never-minted case; each has its own write path and neither was opened.
