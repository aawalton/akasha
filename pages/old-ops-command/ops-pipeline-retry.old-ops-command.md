---
id: 2b2f0eb5-3b35-5d9b-8d8c-de1999e6cc95
page-type-slug: old-ops-command
title: "Ops pipeline retry"
slug: ops-pipeline-retry
domain-parent-slug: domain/ops-pipeline
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/pipeline/retry.ts
path: pipeline retry
irreversible: true
---

# Definition

- **Ops pipeline retry** — one pipeline's failed workflows and their blocked dependents set back to pending on the same rows.

# Design

Reusing the rows reuses the node the pipeline was pinned to at its first dispatch, which nothing clears, so a step that failed for want of capacity on that node would fail the same way again. It refuses that step rather than retrying it.

# Help

Re-dispatch ONLY the failed (and their dependent-blocked) workflows of an existing pipeline IN PLACE — same pipeline page, same commit, same inputs. No new pipeline is created.

This is the cure for a transient environmental failure at unchanged inputs: a step that died because a service it reads was down, a flaky registry fetch, a git-transport wobble. The alternative is a fresh pipeline at a newer commit, which costs a full run of every workflow rather than the failed subtree.

Everything it reads and everything it writes is a file. It reads the pipeline, workflow and step pages, decides which pages to reset, and writes each reset guarded on the status it was decided from. It dispatches nothing itself: `sweep-pipeline-pages` owns every move from `pending` onward, so a reset subtree is picked up on that service's next tick and driven back to pods.

Selection. Without --workflow: every workflow of the pipeline standing at `failed` or `blocked`. With --workflow <name>: that workflow, which must be `failed`, plus the transitive closure of `blocked` workflows depending on it. Within the selected workflows, only steps standing at `failed` or `blocked` are reset — a step that passed keeps its verdict, and its work on the CI store is reused.

What a reset clears. A step goes back to `pending` with its whole husk dropped: the container it ran in, when it was dispatched, launched, started and completed, its exit code, its failure reason, and every dispatch-wait and launch-refusal field. A workflow goes back to `pending` with its failed-steps and failed-dependency dropped. The pipeline is moved from `failed` to `running` last, so nothing dispatches against a pipeline whose children are half reset.

NOT a capacity cure. A step that failed `capacity-starved` is refused: the pipeline keeps its node assignment, so a reset step re-dispatches onto the node that starved it and would wedge identically. Only a fresh pipeline re-picks a host.

Refuses loudly, with no writes, when the pipeline is not retriable: still underway, answered elsewhere, overtaken, passed, or standing at a commit that is no longer its branch tip. That last one matters most on `main`, where a retry re-runs deploy workflows: retrying a superseded commit would deploy it over what landed after it.

Default stdout: `<key>\t<value>` lines. --json stdout: a compact single-line result object.
