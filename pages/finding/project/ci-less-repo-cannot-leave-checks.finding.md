---
id: 520254b1-34dc-50fc-add3-40d280c98633
page-type-slug: finding
title: "CI less repo cannot leave checks"
domain-slug: barred-meaning/project
---

# Claim

A project whose commits land in a repository with no CI can never leave `checks`, because the handoff gate demands a full CI verdict that no pipeline in that repository can ever produce.

# Evidence

`ops project move-to 18177 --status awaiting_lead_verification` refuses, and the refusal is
reproducible: the latest pushed commit `36c4a5c` "carries no green, FULL CI verdict — neither a
completed full branch-CI run nor a green-equivalent full main pipeline covering that SHA."

That SHA and its predecessor `ecc39be` are both recorded on the row and both live in
`~/code-editor`, a fork carrying no CI. There is no branch `project-18177` for a branch pipeline
to run on and no main pipeline that will ever contain the SHA as an ancestor, so neither of the
two verdict sources named in `packages/alanwalton/projects/cli/src/pure/decide-branch-ci-gate.ts`
is reachable even in principle.

The project declares `live-on: commit`, and the remedies the refusal itself offers each assume
the monorepo: run `ops project check` and let branch CI go green, wait for the main pipeline on a
merge commit, or re-run `ops project deploy`. `ops project check` refuses on `main`, which is
where the fork's work landed.

`decide-handoff-gate.ts` already carries an attribute for a child declaring that its work
produced no repo commit. The uncovered case is the neighbouring one: work that DID produce
commits, in a repository CI does not reach.

The delivering seat declined to write the retired `liveOn` row field to slip the gate, on the
grounds that buying the status move would corrupt the record the gate reads. That was the right
call and it is why the row sits at `checks` with the work already built, verified and live.
