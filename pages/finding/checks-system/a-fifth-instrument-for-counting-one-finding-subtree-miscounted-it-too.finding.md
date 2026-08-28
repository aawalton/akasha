---
id: b8fa923a-4442-5ee8-a049-29c7e52e6468
page-type-slug: finding
title: "A fifth instrument for counting one finding subtree miscounted it too"
slug: a-fifth-instrument-for-counting-one-finding-subtree-miscounted-it-too
domain-slug: domain/checks-system
---

# Claim

A keyword sweep over finding bodies is a fifth instrument that gave a clean but wrong count of the pages-system finding subtree, and it is not among the four `the-rule-caught-the-people-writing-it` records. Asked to re-derive the figure of 25 pages-system findings repointed to `domain/global`, a narrow sweep answers 11 and a loose one answers 743. Neither is 25, and one of them fails silently.

# Evidence

Measured 2026-08-28.

`pages/finding/checks-system/the-rule-caught-the-people-writing-it.finding.md:29` names four costumes of one miscount and calls them four: a folder-anchored glob, a `pages/`-only walk, a directory-scoped positive control, and a page-type-restricted parent walk. Its specimens for three of them stand at `:21`, `:23-25` and `:29` of the same page.

The fifth is a keyword sweep over finding bodies, and it stands in no finding.

Run against the question it was built for: 743 findings carry `domain-slug: domain/global`, of 3,120. A sweep over those 743 for `shared/pages-(access|query|ui|write)`, `page/frontmatter.ts`, `page/page-address`, `page/file-tree`, `pageTypeOf`, `tools/lib/page-` and `pages-system` returns **11**. A looser sweep returns **743**, because the term matches every finding own frontmatter key.

The loose sweep fails loudly and would be caught. The narrow one does not: 11 is a plausible-looking number, arrived at by a rule nobody stated, and it is what a reader would have carried away.

The general shape holds and is what makes this worth recording: each instrument produced a clean number that read like an answer, and the fifth was built by someone who had just read the account of the other four. A warning about an instrument does not fire while you are building one.

Not measured: what the true count of pages-system findings sitting outside the subtree is. No instrument here has earned that number.
