---
id: 5cabac94-4f81-5e1b-811c-e0fd4f493470
slug: ast-grep-root-sgconfig-false-violation
page-type-slug: finding
title: "Ast grep root sgconfig false violation"
domain-slug: domain/global
---

# Claim

`check-ast-grep` reports an `sgconfig.yml` at the repo root as declaring no rule files, even where
its `ruleDirs` resolve and its rules are loaded and applied on the same run. Every probe tree built
to measure a rule against planted spellings — the technique this audit uses to establish that a rule
refuses its own defect — carries one extra violation that belongs to the probe's shape rather than
to anything it planted, so a probe that ought to read clean cannot.

# Evidence

Observed 2026-08-10 while verifying #18415 in `/home/walton/worktrees/18484`.

A probe tree at `/var/tmp/verify-18415/plant` holds `sgconfig.yml` with `ruleDirs: [rules]` and one
rule file under `rules/`. Run as
`bun infra/cluster-checks/src/checks/check-ast-grep.ts --repo-root /var/tmp/verify-18415/plant`,
the same run prints `[ast-grep] no-hardcoded-ast-grep-scan: 4 file(s)` and
`ran 1 rule(s) from 1 config(s) in 1 walk`, and then
`- sgconfig.yml — declares no rule files — an ast-grep config with no rules verifies nothing`.

The loop in `infra/cluster-checks/src/checks/check-ast-grep.ts:53` takes the config's directory as
`sgconfig.slice(0, sgconfig.lastIndexOf("/"))` and asks at `:54` whether any rule path starts with
`${dir}/`. For a config at the root there is no slash, so no repo-relative rule path ever satisfies
the test. The message is at `:57`.

This repository carries one `sgconfig.yml` and it is nested, at `infra/cluster-checks/sgconfig.yml`, so
nothing in CI meets this today; what meets it is every throwaway tree built to measure a rule.
