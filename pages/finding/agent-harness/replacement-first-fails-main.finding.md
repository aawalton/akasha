---
id: 562cadf7-b1b1-5c87-ab41-33261053333c
slug: replacement-first-fails-main
page-type-slug: finding
title: "Replacement first fails main"
domain-slug: domain/agent-harness
---

# Claim

Landing a replacement in the instructions repo before removing what it replaced makes the code repo's main branch fail for the length of the gap. A check reading its entry set from the instructions repo sees the replaced code-repo file orphaned the instant the replacement lands, and the merge queue then ejects every entry until the removal lands. Nothing warns that the ordered pair carries this cost, and it surfaces as a failure attributed to whoever enqueues next.

# Evidence

On 2026-08-15 the instructions repo took `40a308013`, moving the bootstrap CLI there. That orphaned `packages/infra/ci/workflows/src/ci-workflows/bootstrap.ts` in the code repo, a four-line forwarder with no importer and no `exports` entry, and the only file in its directory.

Main's previous pipeline, 28106, passed. The next entry to the merge queue, 11591 at staging pipeline 28107, failed `check-ast-unused` on one violation: `bootstrap.ts:3 default default — not reached from any entry`. That entry carried none of the change that caused it.

Attribution was settled rather than inferred. The seat holding 11591 checked out `origin/main` at `af292e8eb5` on its own, with none of its commits present and its own dependencies installed, ran `check-ast-unused` against it, and got the same single violation. Main carried the fault alone, so the queue would eject whoever enqueued next, not only that seat.

I confirmed separately that the replacement was live throughout: `ops ci-workflows bootstrap --list` discovered 43 workflows, printed the layer chain and exited 0, reaching the code repo only for `@infra/ci-workflows/bootstrap-workflow`. So the failure was not a broken capability. It was a window in which the capability stood in one repo and its corpse stood in the other.

`Replace Before Removing` on `domains/agent-harness.md` requires this order, and the order is right: removing first leaves the harness with neither for a deploy's length. What is unrecorded is that a check keyed on the instructions repo makes the gap cost the whole queue rather than costing nothing, and that the removal therefore has to follow closely rather than at leisure.

The gap here ran about two hours and was closed by reassigning the one deletion to a seat already rebasing.
