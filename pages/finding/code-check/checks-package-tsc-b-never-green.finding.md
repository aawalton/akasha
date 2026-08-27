---
id: 2a356490-f85e-5373-8dd1-b1d65e2498e8
page-type-slug: finding
title: "Checks package tsc b never green"
domain-slug: domain/global
---

# Claim

`bunx tsc -b` in `packages/infra/checks` cannot reach exit 0 on `main`. Two events-handler signatures return `Promise<void>` where `Promise<EventsHandlerSkip | undefined>` is wanted, in `packages/shared/worker-runtime/src/test-helpers.ts:175` and `packages/infra/ci/worker/src/reactors/branch-event-reactor.ts:314`. Both sit in referenced projects rather than in the checks package, whose own sources compile clean.

# Evidence

Reported independently by four seats verifying four unrelated children of tree #18484. Each checked attribution before reporting: both files, and the `EventsSubscriberHandler` type that rejects them, are byte-identical to `main`, `git status --porcelain` is empty on both, and the commit that last touched them is an ancestor of `origin/main`. So this is standing on main rather than introduced by any branch.

WHY IT COSTS MORE THAN TWO ERRORS. A package whose build command cannot exit 0 has no usable pass state, so every seat working in `packages/infra/checks` has to decide for itself which reds are its own — and each of the four above spent part of a stage doing exactly that. The manager put a warning into the tree's dispatch brief, which reaches this tree's children and nobody after them. The honest reading a seat is left with is that the package's own sources compile clean and `tsc -b` says nothing, which is a build command that certifies nothing while exiting non-zero.

The signature is #16942's. Nothing here establishes whether the handlers or the type is the side that is wrong: a handler that genuinely never skips returning `Promise<void>` is a reasonable thing to write, and a subscriber type demanding an explicit skip verdict from every handler is also reasonable. Which one moves is a call for whoever owns that seam.

NOT ESTABLISHED: how long it has stood, and whether anything in CI runs `tsc -b` over that package. If CI typechecks per package rather than by project references, this is invisible to the pipeline and visible only to a person at a terminal, which would explain a red surviving on main uncharged.
