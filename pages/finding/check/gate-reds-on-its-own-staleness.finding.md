---
id: c56c523d-ed5c-5303-82e3-c4ab5931d172
slug: gate-reds-on-its-own-staleness
page-type-slug: finding
title: "Gate reds on its own staleness"
domain-slug: domain/old-check
---

# Claim

Three gates have refused because a move or an extraction left a hand-maintained constant pointing at the wrong set, so the refusal was about the gate's own model rather than the class it guards. `check-liveness-routing` has refused once in 1,553 commits and that once was a stale premise: it has caught no bypass in its life. Two of the three refuse by exit 2, which reads as a tool error; this one refuses by a clean exit 1 that is indistinguishable from a real catch.

# Evidence

Measured 2026-08-08 by replaying gates against trees extracted at each commit.

`check-liveness-routing` was swept exhaustively across all 1,553 commits since its landing at `126afa8dc0`, with none unevaluable: 1,552 green and one red. The red is `ccf29c9ebb`, cleared at `df84630103`, whose body states the defect:

    That list is the gate's premise — the set of files that ARE the decider —
    not an exemption list, so extracting a helper out of a named file left the
    premise untrue and two consumers reading a bypass they had not moved toward.
    The gate correctly reported that its model of the tree went stale under it.

The fix is one line inserting `agent-liveness-inputs.ts` into `DECIDER_MODULES`. Nobody wrote a bypass.

`check-temper-catalog-fresh` and `check-eso-typings-fresh` are the same shape from a different cause: each was blinded by a package move that left a hand-maintained path constant pointing at nothing, and each was remedied by repointing the gate rather than by fixing an artifact. Both refused by exit 2, so their refusal at least looks like a tool error. `check-liveness-routing`'s does not.

The consequence for any catch count is that a red is not evidence the guarded class occurred. It may be evidence that the tree moved under a constant nobody updated — which is a real defect worth a red, and a different one from the gate's purpose.

Someone found this already, in one check, and wrote the discriminator into the same commit body:

    a stale premise and a real bypass are identical from the exit code alone:
    the tell is whether the newly-flagged file imports FROM the decider set
    or has left it.

That test is sound and it lives where only the next reader of that commit will meet it. Nothing in the check's own output applies it, and nothing outside that commit records that it exists.
