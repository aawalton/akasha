---
id: 34c2a356-7c23-5e39-a700-65fa10db4bbe
page-type-slug: finding
title: "Page suffix command counts dots"
slug: page-suffix-command-counts-dots
domain-slug: domain/page-types-system
---

# Claim

`tools/commands/page/suffix.ts` decides whether a file is already named for its page type by counting the dots in its name, which is a different rule from `pageTypeOf` and disagrees with it on any page whose stem carries a dot.

# Evidence

Measured 2026-08-27, while repointing the identification sites onto `pages-system/page-type/page-type.ts`. This site was left where it stands, because repointing it would change behaviour rather than preserve it.

`alreadyNamed` at `tools/commands/page/suffix.ts:57` reads `name.split(".").length === 3 && name.endsWith(`.${slug}.md`)`. `pageTypeOf` reads the word between the last two dots and does not care how many stand before it. So `pages/x/a.b.domain.md` is a page of type `domain` to `pageTypeOf` — `pages-system/page-type/page-type.unit.test.ts` and `tools/page/page-types.unit.test.ts` both assert that case by name — and is not already named to `alreadyNamed`, whose split yields four parts rather than three.

The consequence is in `refusalsFor` two lines below, which reads the same count: a page whose stem holds a dot is refused as one that "already carries a second suffix, so it is not a bare page file". The command would decline to name a page that is correctly named.

NO FILE EXERCISES THIS TODAY. Over all 61,152 markdown files in this repository there are zero whose page type `pageTypeOf` names and `alreadyNamed` denies, so nothing is refused now that should not be. What stands is a second rule for a settled question, waiting on the first page whose stem carries a dot.

Not measured: whether a page stem holding a dot should be admitted at all. `domain/page-types-system` settles which word names the page type and says nothing about what a stem may contain, so the repair may be to repoint this onto `pageTypeOf` or to refuse such a stem somewhere one rule states it.
