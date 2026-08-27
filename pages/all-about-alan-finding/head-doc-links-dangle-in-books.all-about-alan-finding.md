---
page-type-slug: all-about-alan-finding
id: 79a8e226-5352-5aa0-8f20-1b1204b623cd
slug: head-doc-links-dangle-in-books
title: "Head doc links dangle in books"
domain-slug: domain/all-about-alan
---

# Claim

Seven tracked files in `~/books/all-about-alan/` carry nine markdown links to a `CLAUDE.md` that exists nowhere in the books repository, so every one renders as a broken link to a reader of the live corpus. The standing sweep for this citation form measures `~/code` source files and cannot reach another repository, so a repair driven by it completes while all nine stand.

# Evidence

Measured 2026-08-08 in `~/books` while emptying `dirty/code/packages-books-all-about-alan-notes-claude.md` and the `-personas-claude.md` beside it, which are the two documents most of these links point at.

Run in `all-about-alan/`, matching the markdown link form and printing each hit (exit 0), the nine are: `notes/anthropic-remediation.md` lines 2 and 65, the second seeking the `anatomy` anchor; `notes/axiomatic-ethics.md` line 9, seeking `splitting`; `notes/insurance.md` line 86; `notes/values-personas-system.md` lines 13 and 145 and `notes/persona-personal-meaning.md` line 169, all three reaching up to `../personas/CLAUDE.md`; and `personas/zeli.md` line 61 with `personas/sophia.md` line 41, both seeking `stub-vs-filled--never-invent-the-rib`.

`git ls-files` piped to a case-insensitive count for `claude` in `~/books` returns 0. No such file is tracked anywhere in the repository, so all nine targets are absent rather than moved within it.

WHY THIS IS NOT THE STANDING FINDING. `code-repo/claude-md-citations-all-dangle.md` measures 639 citations across 412 files and states its scope in its own command: `git grep` over `packages/`, run in `~/code`. That is bounded to one repository and one package tree, so it cannot see `~/books` at all. This is a citation form beside the three it enumerates, in a repository it does not reach.

WHAT MAKES THIS COSTLIER THAN A STALE COMMENT. These are links in human-readable prose, not citations inside docblocks. A reader of `notes/axiomatic-ethics.md` is offered the splitting convention and gets nothing, and two persona files route a reader to the rule forbidding an invented rib — which is the corpus's own guard against writing a claim about Alan he has not made.

The links predate this sweep: the prose moved from `~/code/packages/books/` to `~/books/` without its head documents, and `~/books` has never tracked one.

Not probed: whether `book-of-everything` or `tower-of-nimue` carry the same form. The count is `all-about-alan` alone.
