---
id: 8637caf0-58af-57cb-9b9f-1e0c1beb7ab0
slug: list-file-resolves-to-nothing
page-type-slug: finding
title: "list(file) resolves to nothing"
domain-slug: domain/required-reading
---

# Claim

`tools/required-reading.ts` resolves no property typed `list(file)`, so every value one carries is unread. Eight `readout-display` pages now state `route-path` values that reach no page.

# Evidence

Measured on 2026-08-23, on commit `9fdfdefa1`, which introduced `pages/page-property-definition/readout-display-route-path.md` at `type: list(file)`.

Two things stop it, each on its own. `fileKeysIn` at `tools/required-reading.ts:63-71` admits a definition only where `textField(fm, "type")` is exactly `file`, so `list(file)` is never collected as a file key. And line 112 reads the stated value with `textField`, which returns null for an array (`tools/lib/frontmatter.ts:46-51`), so a list would be unread even were the key collected.

Closing it is those two edits: admit `list(file)` in `fileKeysIn`, and read with `listField` instead of `textField`. A third follows from them — `named` at line 109 is a `Map<string, string>` and `named.set` lets the last page naming a path win, so it wants to be a multimap once one path can be named from more than one place.

`region` already has the list machinery: `readScan` reads it with `listField` at line 101, which is why `code-path` took several values. The `file` type has no equivalent.

Measured before and after commit `9fdfdefa1`: `packages/alanwalton/web/app/routes/api.surplus.ts` fell from 7 documents to 5, losing `readout-display-surplus.md` and `readout-group-surplus.md`. `api.inbox-stoplights.ts` fell from 10 to 5. `api.claude-usage.ts`, `api.safety-level.ts`, `api.persona-stoplights.ts`, `api.habit-stoplights.ts` and `api.values-stoplights.ts` fell the same way. Alan ruled on 2026-08-23 that the shrink is acceptable and that the property should state what is true rather than be typed `file` to get single-valued pages resolving.

Scalar `type: file` does resolve, including with a `code:` prefix: `widget-path` on the same commit holds every widget's reach to its display page.
