---
id: f146e350-49c4-57fc-a4ca-137a5fbf039b
page-type-slug: finding
title: "An untracked staged copy sits in the store with no writer found"
domain-slug: domain/page-file
---

# Claim

One file in the store carries a page type suffix followed by `.staged` rather than a file kind. It is byte-identical to the tracked page beside it, it has been there since 2026-08-27 11:50, and nothing in the write path names that suffix. What made it was not found.

# Evidence

`pages/page-property-definition/page-type-named-for.page-property-definition.staged`, 912 bytes, untracked, mtime 2026-08-27 11:50. Observed 2026-08-28 by seat astra at `a591e0f18`, after another agent named it while checking working-tree state and deliberately left it alone as not its own.

`diff` against `pages/page-property-definition/page-type-named-for.page-property-definition.md` reports no difference. The tracked sibling last changed at `5c6316993`, "a filled rule is bounded at 100 characters rather than 71".

It is the only file of its kind in the repository. `find . -name "*.staged"` outside `node_modules/` and `.git/` returns that one path and nothing else.

No writer for it was found. `grep -rn "\.staged" --include=*.ts` over `tools/`, `ops-cli/`, `page/` and `pages-system/` returns nothing at all, so the suffix appears in none of the code that writes the store.

It is inert as far as page reading goes. The page type's declared glob is `akasha:**/*.page-property-definition.md`, which the file does not match, so no page walk picks it up and the page beside it answers normally.

`pages/domain/page-file.domain.md:15` reads "A page file's suffixes are its page type and then its file kind." `.staged` is not a file kind, so this file has a page type suffix and then something else.

Not measured: what created it. Not measured: whether any reader outside the four trees searched matches the suffix. Not measured: whose act left it, or whether the act that left it also failed.

The file has deliberately not been removed: it is the only specimen.
