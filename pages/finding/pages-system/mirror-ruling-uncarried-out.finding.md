---
id: 4018fe1c-76df-5c83-a828-f6d061fc89af
page-type-slug: finding
title: "Mirror ruling uncarried out"
domain-slug: domain/pages-system
---

# Claim

Alan ruled on 2026-07-27 that both page/file projections go, and the page-to-file mirror is still running a year-quarter later: the systemd unit is active, its edit-blocking hook is wired, and every carve-out it costs still stands. The downstream condition he deferred the removal on has since been met — `ops persona load` is gone and a persona is now a document — so the mirror's last stated justification has lapsed without anything reporting it.

# Evidence

Measured 2026-08-07 while emptying `dirty/skills/agent-harness/findings/carriers-on-different-clocks.md`, which is where the ruling is recorded. That document is queued for removal, and so is the `dirty/maybe-keep/` copy the block was kept in.

The ruling, in the source's words: "**Alan's ruling 2026-07-27: both projections go** (this one and the file→page `docs-page` exporter, already defined as #16313). Not filed as a project because the trigger is downstream: `ops persona load` is being replaced by the role/domain/persona **skills** pattern... When it lands, the framework-doc rows lose their only reader and this mirror loses its last justification."

The mirror is live:

- `packages/shared/pages/fs-projector/` — 20 tracked files, 1319 lines.
- `systemctl --user is-active pages-fs-projector.service` reports `active`; the unit is at `packages/shared/dotfiles/.config/systemd/user/`.
- `ops pages-mirror run` and `ops pages-mirror reconcile` are live verbs.
- `ops enforcement list --grep pages-mirror` reports one wired hook, `instructions/tools/hooks/block-pages-mirror-edit.sh`, from `instructions/settings/agents.json:46`.
- Carve-outs standing: `.gitignore:85`, `.ignore:3,9,10`, `verdict-coverage.config.json:455-456`, `packages/infra/scripts/src/docs-validator/classify.ts:13,25`, and `worktree-ops.ts` / `worktree-reconcile.ts` at `packages/infra/git/cli/src/lib/`.
- `fs-projector/src/policy.ts:4-9` still keys opt-in on `projectsToFilesystem`.

The trigger landed, in documents rather than skills. `ops persona load` does not exist. `fetchFrameworkDocContent`, named in the source as the framework-doc row's only reader, matches zero tracked source files. `packages/agents/shared/persona-facts.ts` states that `domains/personas/*.md` answers which persona a seat is; 41 stand.

Not re-measured, needing the database: the live-row counts given as 27 helper, 2 framework-doc, 41 persona. Whether any row still opts in is the one input to the removal I did not take.
