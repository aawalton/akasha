---
id: 50ebbd7c-20ba-5da3-b1b3-59ccdb55ec77
page-type-slug: finding
title: "Missing page exits 70"
domain-slug: domain/global
---

# Claim

`ops awen authors-note-window` exits 70 — the unclassified-defect code — when the story-chapter page it was asked for is simply not there.

# Evidence

The body raises a bare `Error` for that case, which `exitCodeForThrowable` cannot classify, so an ordinary absence is reported as an unhandled defect. Its help block declares no exits at all, so the screen offers a reader nothing to check the 70 against.

Measured both sides of the move: `--story no-such-story --chapter 600` and `--chapter 99999` each exit 70 with identical stderr from the code repository's handler and from `tools/commands/awen/authors-note-window.ts`. The bare `Error` was carried across deliberately rather than upgraded to a classified refusal, so the move changed no exit code.

Its sibling `authors-note-validate` answers the same absence with a `no-page` data refusal at exit 2, which its help declares.
