---
id: 43aecade-02f8-57d8-b45b-68533a1d3f3e
slug: frozen-cursor-cleared-by-activity
page-type-slug: finding
title: "Frozen cursor cleared by activity"
domain-slug: domain/global
---

# Claim

The subscriber-lag wedge detector suppresses its own verdict on the evidence that should confirm it: a subscriber whose cursor has not moved since the previous observation is passed over whenever it looks busy, so a worker that restarts and stays frozen clears its own alert and the condition reports clear.

# Evidence

On `origin/main`, `packages/agents/devops-monitor/src/wedges/subscriber-lag.ts` reaches its busy guard only after `row.cursorSeq !== prevCursorSeq` has already been ruled out and `continue`d, so every row arriving at the guard has a cursor equal to the previous observation. The guard then calls `isBusySubscriber` over log and iteration activity and `continue`s when it answers yes, skipping the `state: "wedged"` return below it.

Activity is what a spinning wedge and real work both show, so the test cannot separate them, and the only thing it can do at that point in the flow is suppress a stall it has already established. Progress was decided upstream.

Project #19262 was opened against this and its branch `project-19262` carries the repair at `8151043294`, three commits over four files, unlanded and not an ancestor of `origin/main`. It makes the busy reading part of the wedged evidence rather than a reason to stay quiet, moves the fixtures to `_subscriber-lag-fixtures.ts`, and splits the incident cases into `subscriber-lag-progress.unit.test.ts` after the test file passed the 500-line cap.

A second observation from the same work stands separately as `pages/finding/code-harness/agent-tests-typechecked-by-nothing.finding.md`: the fixtures were short two required fields and nothing caught it, because `tsconfig` excludes `**/*.test.ts`.
