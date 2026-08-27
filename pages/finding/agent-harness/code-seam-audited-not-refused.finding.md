---
id: 59a104e8-6f49-55e2-9da5-2fa1b3bace9d
page-type-slug: finding
title: "Nothing refuses a change that breaks the instructions-to-code seam; one audit reports it if run"
domain-slug: domain/agent-harness
---

# Claim

Nothing refuses a change that breaks the seam the instructions repository reaches code through; one audit reports it, and only when somebody runs it. `codeModule<T>(ref)` casts a loaded module onto a locally declared interface, so removing a named export typechecks clean in both repositories and fails only when the path runs. `ops audit ast-unused` does follow every such reach — 439 of them, 765 analysis inputs — but it is an audit, reporting and never refusing, and a finding still exits 0.

# Evidence

Run against the worktree at `/var/home/walton/worktrees/19447`: 439 reaches read from 1670 files under `tools/`, 438 modules rooted, 1 unresolvable (`packages/stories/narration`, unrelated), exit 0. Its own help states it was `check-ast-unused` and was demoted because its entry set came from a repository the change under test did not touch, so an instructions commit turned unrelated branches red.

This corrects an earlier reading of mine that said nothing checks the exports the seam names. Something audits them; nothing refuses on them.

Not measured: how often the audit is actually run, whether any landing has broken a reach since it stopped refusing, and whether the demotion could be undone by scoping the entry set to what the change touches.
