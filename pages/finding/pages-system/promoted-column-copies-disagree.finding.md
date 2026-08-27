---
id: 83149dc2-759e-5a56-b92f-3d30a44578e8
page-type-slug: finding
title: "Promoted column copies disagree"
domain-slug: domain/pages-system
---

# Claim

`packages/shared/pages/proc/src/page-attributes.ts` says at line 9 that both TypeScript copies of the promoted-column key set encode the same fixed 10-key set. Its own `PROMOTED_COLUMN_KEYS` holds 10; the sibling `_pages_row_matches.ts` holds 13. The three absent are `slug`, `uniqueKey` and `parentKey`, and by that module's own logic they are stripped into the attribute bag they were promoted out of, with nothing raised.

# Evidence

Measured here rather than taken from a report. `page-attributes.ts` lines 15 to 26 declare id, seq, title, icon, userId, pageTypeId, pageTypeSlug, createdAt, updatedAt, deletedAt. `_pages_row_matches.ts` lines 233 to 246 declare those ten plus slug, uniqueKey and parentKey, and its comment says it mirrors the plpgsql `IF key IN (…) THEN RAISE EXCEPTION` and `routing.toColumn`. The 13-key set is the one that matches the deployed table.

The two sites fail differently, which is why the drift is quiet. `_pages_row_matches.ts` raises by name on a promoted key. `page-attributes.ts` uses its set to decide what to strip, so an unlisted key falls through into the attribute bag and nothing is raised.

Raised by an archivist seat emptying `dirty/folders/pages-access.md`, which reported the same numbers from its own reading. That seat declined to file it because `dirty/questions/code-repo-pages.md` line 11 already records it — a record standing under quarantine and queued for removal, so it would have gone with the sweep. This finding exists so the defect outlives that file.

A related claim from the same seat's source is under quarantine at `dirty/maybe-keep/folders/pages-access.md`: four hand-copies of this one list stand in the code, the compiler's spelled `STRUCT_FIELDS.pagesRow`, so a grep for `PROMOTED_COLUMN` finds three of the four. Not measured here.

Not judged: whether the repair is one shared constant, a check holding the copies in agreement, or correcting the comment.
