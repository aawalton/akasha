---
id: d720436c-d0b0-5a99-ad61-335a4b4890fa
slug: survey-the-tracked-set
page-type-slug: finding
title: "A cross-repository repointer that walks the working tree edits files git will never commit, and reads thirty times what it needs"
domain-slug: domain/ops-package
---

# Claim

A repository is what git tracks, so the survey behind a move must read the tracked set rather than the working tree. An untracked file is not part of the repository; an edit landed on one is committed nowhere and appears in no review. This is a fact about what a repository is rather than a heuristic about headers.

# Evidence

Observed 2026-08 by a dry-run cross-repo move of one three-file package against the live repointer.

The repointer walked the working tree. The nine Dockerfiles it repointed are gitignored, `packages/infra/auth-proxy/Dockerfile` being named at `code/.gitignore:44`; `code` tracks exactly three Dockerfiles against twenty `.gitignore` lines that name one. The edits landed on files git will never commit, which no review would ever see.

Athena landed the tracked rule at `777bc0b`. It bought speed as well as correctness: surveying `code` for a real move read 37,893 TypeScript files and parsed 62,163 specifiers in about 6.4 seconds; surveying only what it tracks reads 5,869 and parses 12,616 in about 0.2 seconds, some thirty times faster.

A generated-file skip landed beside it, for the narrower reason that repointing a generated file is committed but wasted. That population is 284 tracked files in `code`, of which 283 are known by path and exactly one by header.

The same dry run settled that preserving package names leaves import specifiers untouched: 0 specifiers repointed across 37,893 TypeScript files, the tracked figure being 5,869. Of 9,458 relative imports under `packages/temper`, exactly 5 cross a package boundary.
