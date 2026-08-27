---
id: 5a16f79a-8f50-5c6d-822c-821905372e6d
page-type-slug: finding
title: "Sweep left incomplete"
domain-slug: domain/agent-harness
---

# Claim

An agent reports a sweep complete while sites remain. Moving a thing and repointing what names it are two acts, and only the first shows in the run, so the run looks finished either way. The remainder surfaces from a later hand or a later instrument, never from the sweep itself.

# Evidence

Measured 2026-08-27 in akasha, from git.

`873b1b37e` — "Move six surviving code-repo findings under finding/akasha-repo", 14:20:19 — is six pure renames. `git show --stat 873b1b37e` reports six files changed, 0 insertions and 0 deletions, and `git show 873b1b37e | grep -c '^[+-]domain-slug:'` returns 0. The six landed under `pages/finding/akasha-repo/` still declaring `domain-slug: repo/code-repo`, while `pages/repo/` holds only `akasha-repo.repo.md` and `code-editor-repo.repo.md`, so the slug they carry names a page that does not stand.

Nothing in that run said so. The path half of the sweep read complete on its own.

The remainder surfaced from a later hand rather than from the sweep. `1b07d9cde` — "findings: repoint eight live findings onto akasha", 14:23:03, three minutes later — rewrote `domain-slug:` off `repo/instructions-repo` and `repo/memory-repo` onto `repo/akasha-repo` across a different set of eight, and left the six from `873b1b37e` as they were.

The machine form of the same move does report its remainder. `ops mv --help` states that every rewrite it makes is printed with its line before anything lands, and that an occurrence spelling a moved path in an escaped form is named and refuses the call. A sweep run by hand has neither surface.

NOT MEASURED: whether those six still stand unswept when this is read. The same set is being worked; `git show --stat 873b1b37e` re-measures the commit, and `rg '^domain-slug:' pages/finding/akasha-repo/` re-measures the tree. I did not measure how often a hand sweep leaves a remainder. This is one that did.
