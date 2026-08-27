---
id: 6759cdd3-b211-57bc-8877-eac83b645a09
slug: convention-files-unreachable
page-type-slug: finding
title: "Convention files unreachable"
domain-slug: domain/scripture-study
---

# Claim

`dirty/my-faith/OVERVIEW.md` routes every structural claim to a `CLAUDE.md` convention file, and none of the files it names exists in akasha. The corpus's stated conventions are unreachable from the document that is loaded at session start to carry them.

# Evidence

OVERVIEW.md's own front matter says "every structural claim traces to a CLAUDE.md convention file", and its body links three: `sources/CLAUDE.md` for the source-authority tiers, `sources/book-of-mormon/CLAUDE.md` for the two-artifact rule, and — from `pages/book-chapter/my-faith/sources/book-of-mormon/abstraction-map.book-chapter.md` — `commentary/CLAUDE.md` for the linear commentary.

None resolves. `find . -name 'CLAUDE.md'` over akasha returns only `infra/eso-rig/CLAUDE.md`. `pages/book-chapter/my-faith/sources/` holds only `book-of-mormon/`, and `pages/book-chapter/my-faith/sources/book-of-mormon/` holds only `abstraction-map.book-chapter.md` — there is no `commentary/` directory at all, so the two-artifact rule has one artifact.

The convention files are not deleted, they are quarantined in the instructions repo as `dirty/code/packages-books-my-faith-sources-claude.md`, `dirty/code/packages-books-my-faith-sources-book-of-mormon-claude.md` and `dirty/code/packages-books-my-faith-sources-book-of-mormon-commentary-claude.md`, alongside `packages-books-my-faith-claude.md`. `dirty/` is queued for removal, so the conventions go with the sweep unless something moves them.

This bites where the corpus is live rather than dormant: `ops scripture today` exits 0 and returns 1 Nephi 1 with full verse text off a seeded `scripture-passage` row, so sessions can run against conventions their own orientation document cannot reach.

Found while ingesting `dirty/skills/scripture-study/SKILL.md`, whose claims were largely retired BY OVERVIEW.md carrying them live — which is what made the broken half visible.
