---
id: 2f3b3b0d-8cf2-502e-bc37-89ac85219651
slug: instructions-root-unresolved
page-type-slug: finding
title: "`instructionsRoot()` builds the repository path by concatenation and never resolves it"
domain-slug: domain/agent-harness
---

# Claim

`instructionsRoot()` builds the repository path by string concatenation and never resolves it, against Real Path.

# Evidence

`tools/lib/launch-seat-tmux.ts:40-44` returns `INSTRUCTIONS_ROOT` when it is set and non-empty, and otherwise `${process.env.HOME ?? "/home/walton"}/instructions`. Nothing on that path calls `realpathSync`.

`/home` is a symlink to `var/home` on this workstation, so the literal fallback and the `HOME` this box actually sets are two spellings of one directory. Real Path names a symlinked home as the usual source of exactly this.

Nothing fails today. It surfaced because the supervisor's limit-resume monitor now reads account pacing through `pacingFromPages()`, whose `root` defaults to `instructionsRoot()`, so a path that used to feed only file opens now feeds a decision about whether a rate-limited seat is sent back to work. Two spellings open the same file, so the reads keep working; a comparison against a differently-spelled path is where it would answer no, and a dropped match there reads as an account legitimately absent from the pool.

Neither the swap that surfaced this nor anything else has been observed getting a wrong answer from it. This records where the unresolved path now sits, not a failure seen.
