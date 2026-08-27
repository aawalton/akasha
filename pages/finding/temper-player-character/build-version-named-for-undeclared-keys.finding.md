---
id: 6b57135c-0645-4710-ac16-b30cb2b6e020
slug: build-version-named-for-undeclared-keys
page-type-slug: finding
title: "Build version named for undeclared keys"
domain-slug: domain/temper-player-character
---

# Claim

`temper-build-version` states its pages are named `{build}-{version-number}`, and declares neither key. It has no pages and never has, so nothing is misnamed; the rule is instead the only place the store records that a build version was meant to be named by the build it revises and a second component. Its own Design section names that second component differently, so the two surviving statements of the intent disagree.

# Evidence

`pages/page-type/temper-build-version.page-type.md` line 8 states the rule verbatim:

    named-for: "{build}-{version-number}"

Line 21 of the same file states the intent in prose, and disagrees with it: "A version is named for the build it revises and the moment it was taken, both of which the dialog that saves it already holds." The rule's second hole is a version number; the prose's second component is a timestamp. Both agree on the first component being the build.

One property is declared on this page type, in `pages/page-property-definition/temper-build-version-account-page.page-property-definition.md`: `key: account-page`, `type: relation-slug`, `target-slug: temper-account`. There is no definition for `build` and none for `version-number`.

The type has no pages. No directory `pages/temper-build-version/` stands, no file matches `*.temper-build-version.md`, and `git log --all --diff-filter=A --name-only -- '*.temper-build-version.md'` returns nothing, so none has ever stood on any ref. The page type's own line 23 says the same: "Nothing has recorded a version yet, and the shape stands ready for the first one."

The present-day symptom is at write time rather than check time. `nameForNew` in `shared/pages-access/src/file-name.ts` fills the rule for a page write that states no `name` and no `slug`, and refuses with "this write carries no `build`, no `version-number`". So the first attempt to save a build version through the pages system would have been refused, and the rule as it stands could never have named a page.

What makes it a check failure later is `pages-system/`. `checkNaming` in `pages-system/name/name.ts` hands the whole page type to `checkPageType`, and `pages-system/formula/check.ts` line 4 records that checking "refuses a formula naming a key the shape does not declare". That refusal is against the key `name`, not `named-for`: nothing under `pages-system/` reads `named-for` today, and no page type declares `name`. So the failure arrives when the 110 page types carrying `named-for` are carried across to `name`, not before.

Open, and not answered here: what `build` should point at. `character-build` and `companion-build` both stand as page types with pages — 14 and 6 respectively — so `build` most likely wants to be a relation to one of them. Which one, whether it is one key or two, and what the second component actually is, are temper-domain design questions with an owner, and nothing here settles them.
