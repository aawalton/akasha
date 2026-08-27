---
id: 91086610-5af1-579d-981e-8747979652dc
slug: ops-finding-surface-removed-quarantined-path
page-type-slug: finding
title: "Ops finding surface removed quarantined path"
domain-slug: page-type/finding
---

# Claim

Alan ruled (relayed by `ryn-lead`) that the `ops finding` surface be removed entirely, not waiting on #17525, since it is measured 2026-08-02 as non-functional: `ops finding list --domain finding` exits 1 with an empty domain list, and `ops finding file --help` names the quarantined `dirty/skills/<domain>/findings/<cluster>.md` as its destination rather than the live `findings/<domain>/` store, so every seat reaching it fell back to a project-row note nobody sweeping the domain reads.

# Evidence

Project #17538, domain `finding`. Created by `athena-lead` on Alan's ruling, relayed by `ryn-lead`: the `ops finding` surface is removed entirely, not waiting on #17525. Alan: "the old version is broken and bad, so doesn't need to wait." Measured 2026-08-02 by `athena-lead`; re-derivable.

**The gap.** `ops finding list --domain finding` exits 1: "`finding` is not a domain — nothing at skills/finding/SKILL.md — known domains:" with an empty list. `skills/` does not exist under `~/instructions`; `dirty/skills/` does, the old per-domain tree. `ops finding file --help` names its destination `skills/<domain>/findings/<cluster>.md` — the quarantined tree, by design. Nothing reaches `~/instructions/findings/<domain>/`. `file`, `close`, `hold`, `release`, `fragments`, `basis-census` not invoked (first three write); destination from help text, not a run.

**Cost.** Every agent meeting this wall took the row-note fallback, recovered by chance:
- `pages/finding/agent-harness/brief-principal-frozen.finding.md:23` — refused "while the estate is rebuilt," stashed on #17440.
- `manage-17438` isolated a `lint-verdict` defect, put on #17438's notes; re-filed as `pages/finding/code-harness/lint-verdict-measures-the-main-checkout.finding.md` (`c9bbd8bc`).
- #17438's notes:306 — filing disabled "while the instructions estate is rebuilt," carried by hand.

**Replace, not amend.** `dirty/docs/system-prompt.md:72` (via `~/.claude/system-prompt.md`) tells a headless agent to record it via `ops finding file`, or a row note, then retire. The fallback is also wrong: a row note reaches only whoever works that row. `tasks/file-finding.md` carries the correct act: compose outside the root, land at `findings/<domain>/<claim>.md`. This file is under `dirty/`, quarantined but live; in scope, flag in hand-back.

**Footprint.** `packages/agents/instructions/src/finding/`: 20 files, 4,170 lines, 7 verbs (`file`, `list`, `fragments`, `basis-census`, `hold`, `release`, `close`). Four code-repo files name `ops finding file`: `CLAUDE.md`, `.../instructions/CLAUDE.md`, `.../docs/replication.md`, `.../docs/findings.md`. Nothing live calls it.
