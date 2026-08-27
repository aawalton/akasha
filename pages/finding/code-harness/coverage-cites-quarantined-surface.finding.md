---
id: 211c7b95-169f-587e-9ee6-7c54f7d7d060
slug: coverage-cites-quarantined-surface
page-type-slug: finding
title: "Coverage cites quarantined surface"
domain-slug: domain/global
---

# Claim

A both-verdict coverage declaration cites an instruction surface the quarantine sweep removed, so `check-both-verdict-coverage` is red on `deploy-gate-surfaces` for a reason no current work caused and no current work can clear.

# Evidence

`packages/infra/checks/src/lib/both-verdict-coverage-declarations.ts:64` declares `path: "packages/alanwalton/projects/cli/CLAUDE.md"`. That file does not exist in the working tree; `7205e28efd` ("quarantine every instruction surface into the instructions repo") is the commit that removed it.

The check exits 1 on the `deploy-gate-surfaces` family, reported by the seat on `#17599` on 2026-08-03 and confirmed here by reading the declaration and the tree rather than by re-running the check.

The declaration and the surface it points at are in different repositories now: the citation names a path under `~/code`, and the content it named lives in `~/instructions` under quarantine. Nothing reconciles a citation across that boundary, so the sweep that moved the surface could not have updated it.

Not measured: whether other members of the same declaration set cite removed paths, whether the check has been red continuously since that commit, and whether any other check carries citations into the quarantined tree.
