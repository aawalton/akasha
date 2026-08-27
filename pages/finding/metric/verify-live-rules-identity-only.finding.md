---
id: 9caf3365-9875-5186-9376-da87f5ee9d12
slug: verify-live-rules-identity-only
page-type-slug: finding
title: "Verify live rules identity only"
domain-slug: domain/metric
---

# Claim

`prometheus-verify-live-rules` reports "serving exactly the committed set" while comparing only rule identity `(group, type, name)`, never annotation or expression bodies, and was observed live returning success while `/api/v1/rules` still served both pre-fix annotation texts #16099 had just replaced.

# Evidence

Project #16421 (someday_maybe, metric, live-on: deploy). Captured, never defined; moved off `notes` 2026-08-15.

[2026-07-26T05:10:35.013Z] From worker-16099 while sweeping #16099: `prometheus-verify-live-rules` reports "serving exactly the committed set" while comparing rule identity only -- `(group, type, name)`. Annotation and expression bodies are never compared.

Observed live, not inferred: the verb returned success while `/api/v1/rules` still served both old annotation texts -- the exact strings #16099 had just replaced. Right about what it checked, wrong about what it claimed. `CLAUDE.md` asserted the verb proves "the rules are loaded"; that doc is corrected, but the instrument is not widened.

Own row, not in #16099: widening to rule bodies is a deploy-gate surface change, carrying a standing evidence bar (`.claude/docs/deploy-gate-acceptance.md`): a two-sided proof -- one real deploy through the extended gate, one FAIL on known-bad input. Different unit of work than the annotation sweep; worker-16099 was right not to absorb it.

Class and sibling: a verification verb whose success verdict describes something other than what it verifies -- the wrong side of the transformation. Sibling, found independently hours earlier, on #16320: `bun ops seat send` exits 0 having delivered a corrupted payload -- the verdict describes the argument typed, not what landed. Two independent instances in one night of a verb saying "success" about a stage upstream of the one that matters -- a family: a verifier that checks a proxy for the thing and reports as though it checked the thing. Related doctrine on #16342 (Both-Verdict Reachability -- prove the reading is about the run in front of you).

Suggested first step: before widening, establish the known-bad input the proof needs -- a committed rule whose body differs from the live-served body. #16099's incident is a naturally-occurring instance, possibly reproducible from that commit range, cheaper than constructing one.
