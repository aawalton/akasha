---
id: f7d44bd5-b442-5c4d-a341-48b03ba3a61c
page-type-slug: finding
title: "Two kinds one list"
domain-slug: list/code-comment-forms
---

# Claim

The code comment forms list mixes two kinds of shape with different closure. Some are parsed by third-party tools — biome, tsc, shellcheck, the kernel — and that set is closed and stable. Others are parsed by this repository's own code, and that set is open: it grows whenever anyone writes a reader. The list enumerates both as one, so a shape of the second kind is admitted only after something that depends on it has already broken.

# Evidence

Raised by the reviewer seat `claude-code-comment-forms-archivist-review-instructions` on 2026-08-13, reading `domains/lists/code-comment-forms.md`. Its report is at `~/agents/claude-code-comment-forms-archivist-review-instructions/review-code-comment-forms.md`.

Three incidents on record are all of the second kind: `262deee67`, a revert titled `revert the comment sweep: it took out lines the ops CLI parses for its verb list`; the finding `code-comment/parsed-comment-marks-unlisted.md`, recording a second `command:` mark and reader the list does not name; and the section dividers `tools/checks/schemas-bind.ts` reads, whose loss I verified by running that check and finding it failing on both repos.

The reviewer's unbuilt recommendation was to derive the second kind with a check that finds every site reading a comment as data, rather than enumerating it one broken main at a time. That is a proposal and is recorded here only as what it did not build.

Not measured: how many sites in either repo read a comment as data, and therefore how much of the second kind the list is currently missing.
