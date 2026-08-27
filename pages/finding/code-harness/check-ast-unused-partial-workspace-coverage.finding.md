---
id: 468f8238-89d4-505e-bbdc-067973563269
page-type-slug: finding
title: "Check ast unused partial workspace coverage"
domain-slug: domain/global
---

# Claim

`check-ast-unused` analyzes 168 of 373 workspaces (45% coverage, 205 silently skipped) and prints a confident OK verdict naming only the numerator, so a green result covers far less than agents assume — including the workspace holding #16261's largest change and the package #16263 deletes; the 175-vs-168 gap traced to exactly 7 declared-but-nonexistent config entries.

# Evidence

Project #16334 (domain: code-harness, status: someday_maybe, live-on: deploy). No objective; moved off retired `notes`, 2026-08-15.

Found by #16261, reproduced by athena on main at 0664bfa97f. `check-ast-unused` analyzes 168 of 373 workspaces (45%), silently skipping 205, exit 0: "OK — 9810 module(s) analyzed across 168 workspace(s), 8611 entry file(s), zero unused exports" — names the numerator, never the denominator.

Two live instances that evening: `packages/alanwalton/personas/core` skipped — where #16261's largest change lives (`boot-digest.ts`, 93 insertions/36 deletions, the DigestData reshape); clean local result missed the code most likely to carry the defect. `packages/agents/requester-ship-notifier` skipped — the package #16263 deletes. Also reframes #16277's red as luck of location: `packages/infra/git/cli` is configured — two unreachable re-exports there produced exit 0 elsewhere.

General shape: fourth instrument that evening returning clean exit-0 over a population it never examined (after wrong-column ×3, an `ls-tree` pathspec, an enumeration regex) — a filter applied upstream of the summary, reporting what it SAW, never what it was GIVEN.

Proposed fix (#16261's): any check that can skip must print coverage on the verdict line — "OK — zero unused exports (168/373 workspaces analyzed)" vs today's "OK — zero unused exports".

Open: whether the 205 skips are intentional or drift — not established; the reporting fix is correct either way.

RESOLVED sub-finding: the 175-vs-168 gap (config declares 175) is 7 stale config entries. Configured∧skipped=0. 7 declared paths lack `package.json`: packages/shared/supabase/next, packages/shared/tasks, packages/temper/addons/{catalog,datamining,validation}, packages/temper/shared/build-deploy/tstl/lualib, packages/temper/tasks. 175−7=168, exact. Controls: packages/infra/git/cli/package.json exists→True; packages/nope/package.json→False.
