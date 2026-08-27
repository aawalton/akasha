---
id: 1229e79c-33e5-5511-80d1-9673c2cd19b6
slug: five-ways-verification-passed-while-wrong
page-type-slug: finding
title: "Five ways verification passed while wrong"
domain-slug: domain/agent-harness
---

# Claim

One session (2026-07-25) produced five distinct ways a careful agent's verification passed while being wrong — each caught only by a positive control or another agent's audit, never by the check looking wrong — plus a stated limit on "test rather than assume" (testing catches wrong steps, not absent ones); these belong in doctrine before they are lost with the sessions that found them.

# Evidence

Project #16337 (domain: agent-harness, status: someday_maybe, live-on: commit). No objective; moved off retired `notes`, 2026-08-15.

One session (2026-07-25) produced five ways verification passed while wrong, each found live, never by the check itself looking wrong.

1. WRONG OBJECT (5 instances/3 agents): Opus 4.5 token counts vs Opus 5 (nimue) sessions → fictitious "1.4x Tier-boundary price"; `git merge-tree` carrying a rename but integration path is REBASE (worker-16279); check-verb timeout read as "no verdict" 40 min after pipeline went green (worker-16279); `page list --limit 1000` `truncated: true` read as complete over 1,346 rows (nimue); project seq quoted before assignment, stated as observed (nimue). Guard: name the object, verify what you watched IS it.

2. END-STATE test blind to TRANSIENT defect: worker-16279's `link()` reimplementation kept 4/7 properties, passed its own tests (end state matched); dropped property was an early-return — unlinks-then-recreates, opening a window with no symlink.

3. Named safety pattern, unsafe in practice: nimue proposed add-before-remove without checking precondition (old copy INERT); old copy was writable, authoritative, with a live writer editing it.

4. Bounded query, truncation ignored: tool emitted `truncated: true`, unread, over 1,346 rows. Related: pipe-delimited psql output where `a||b` is three fields with invisible empty middle. Guard: `--csv`/JSON, `--all` over `--limit`.

5. Plan from OUTCOMES, gaps at machinery steps: worker-16279's landing plan had no push step; gaps verified for PURPOSE not SCOPE (`setup-symlinks.sh` included 176 lines of provisioning incl. systemd-oomd restart).

Testing limit: missing push step uncatchable by rehearsal — push succeeds pre-rebase, fails after (`--force-with-lease` required); a bare push mints no CI, so the wait never ends.

Landing: 5 candidates (`.claude/CLAUDE.md`, `testing-principles.md`, reliability docs); Rule of Three decides placement.
