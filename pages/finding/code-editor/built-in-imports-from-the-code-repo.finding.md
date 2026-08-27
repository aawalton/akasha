---
id: 75dc5b09-e1b9-5984-b530-7f9125c952dc
page-type-slug: finding
title: "Built in imports from the code repo"
domain-slug: domain/code-editor
---

# Claim

The editor repository's built-in `extensions/ops` imports `@shared/status-bar-access` from the code repository, against this domain's Intent that the editor's build resolves everything it needs inside its own checkout, with no code repository beside it.

No instrument sees the edge. `check-ast-unused` measures the code and instructions repositories only, so the code-repo exports the editor consumes read as unreached, and acting on that reading would break the status bar.

# Evidence

Surfaced on 2026-08-14 by #18893, which deletes the code repository's copy of the editor extension and leaves the editor's built-in as the sole consumer of that package. Deploy two ejected at staging CI 28009 on `check-ast-unused`: 21 violations in `packages/shared/status-bar-access` — 16 distinct symbols, over 16 barrel lines in `src/index.ts` and 5 definition sites.

THE MECHANISM, WHICH IS THE THING TO REMOVE. `extensions/ops/node_modules` in the editor repository is a symlink to `/var/home/walton/code/node_modules`, and `@shared/status-bar-access` resolves through it to `/var/home/walton/code/packages/shared/status-bar-access`. The editor is compiled against the code repository's main checkout and its build requires that checkout present. That symlink is the concrete artifact this domain's Intent line is about, and removing it is what makes the Intent true.

Every one of the 16 flagged symbols is imported by the editor's built-in — flagged-minus-imported is empty, measured independently twice. Two of them, `PipelineHealthCell` and `ProjectTrackName`, are reached only from the editor's own unit tests. A control run on `~/code` main reports zero unused exports, so these exist only because #18893 removes the in-repo consumer.

The check is not at fault and discloses its own limit: `packages/infra/checks/src/lib/system-repos.ts` marks its repo set `predicate-derivation: open-sample — CHOSEN, not derived`, an undeclared repo no check reads being absent rather than UNMEASURED.

WHY THIS WILL NOT SURFACE ITSELF. #18893 lands line pragmas marking the flagged exports reached. `check-ast-unused` can never report one as stale: in `ts-import-graph-dead-exports.ts` the pragma test short-circuits ahead of the liveness test. So on the day the symlink goes, these exports die and the pragmas hide them permanently. Closing this finding means deleting the pragmas in the same act.
