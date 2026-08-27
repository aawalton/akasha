---
id: 4eefb59a-2737-565a-a22c-76c4f60ee170
slug: deletion-does-not-wake-ast-unused
page-type-slug: finding
title: "Deletion does not wake ast unused"
domain-slug: domain/global
---

# Claim

A commit whose only change is deleting a TypeScript file did not wake `check-ast-unused` on branch CI, though that check's watched population is the TypeScript graph.

# Evidence

Read on 2026-08-16 on pipeline 28156, branch `project-19298`, commit `5d91b419e5e4aef0e7fb4dafaa3cf857fa84934a`. The commit deletes one file and changes nothing else.

The verdict was `PASS ... [over 25 of 25 CI steps]`. Listing the inventory with `--verbose`, `check-ast-unused` is not among the 25. `check-code-comments` is, and completed.

`check-ast-unused` declares `watchNodeTypes: TS_GRAPH_INPUT_POPULATION` at `packages/infra/checks/src/lib/check-configs-source-scanners.ts:102`. `check-code-comments` declares `alwaysRun: true` and was selected.

The deleted file was the whole reason the pipeline ran: the six unused exports `check-ast-unused` reports on `origin/main` all stood in it. So the run that was meant to confirm the fix is the run that did not perform the check. Confirmed instead by running the check in the worktree, where it reports zero unused exports over 13336 modules and 12281 entry files, and by a negative control — restoring the file returns exactly six violations, then deleting it returns the run to clean.

Not established: why the step was not selected. A deleted file leaves no node in the graph built from the new tree, so a selector keyed on node types would find nothing watched to have changed. That is the reading this finding was not able to confirm against the selection code, and it is stated as the open question rather than as the cause.

If it is the cause, the reach is wider than one pipeline: a commit that deletes a module and orphans exports elsewhere lands green on branch CI, and the report arrives on whoever next runs a pipeline that does select the check. That is the shape `Dispatch Reach` names, arriving through deletion rather than through a file class nobody watched.
