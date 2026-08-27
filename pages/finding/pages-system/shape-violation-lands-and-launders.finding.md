---
id: 7b337baa-2047-564c-b375-e6a974eafb47
page-type-slug: finding
title: "A page can land carrying a section its shape forbids, and the commit looks gated"
domain-slug: domain/pages-system
---

# Claim

A page can land carrying a section its page type's shape forbids, and nothing about the resulting commit distinguishes it from a gated write. `pages-hold-shape` reports such a page only when somebody runs it, and a later change to the shape can make the section legal, after which the check passes over the page and nothing but git records that the violation ever stood.

# Evidence

`pages/ops-command/ops-page-icon-search-index-generate.md` was created whole in commit `a33e50dc8` at 12:33 on 2026-08-24, carrying a `# Help` section. Its page type then declared `body-shape-slug: domain`, and `pages/page-body-shape/domain.md` names no `help` block. That shape file last changed on 08-22, so it named none at 12:33 either.

The gate does refuse this. A dry-run edit adding `# Help` to `pages/domain/alan-harness-mobile.md` returned `page-holds-shape fail`: "line 14 holds a section outside the shape its page type states: expected one the shape names, measured `# Help`".

That commit's author is a persona and its committer is Alan Walton, which is the pair `tools/lib/git.ts` produces for a write landed through `tools/write.ts`.

`tools/audits/pages-hold-shape.ts` returns `advise` rather than refusing, and runs only when `ops instructions run-checks` is invoked.

Not measured: which route landed that commit. I did not read the producer, and did not establish whether `land()` in `tools/lib/command.ts` was called without gating first, or whether some other path was used. I did not survey other pages for sections outside their shape. At 18:23 the same day I moved `ops-command` onto a shape that admits `# Help`, so `pages-hold-shape` now passes over this page, and the violation is no longer observable except through git history.
