---
id: fa70d865-b897-5159-ae24-18eca1398217
slug: select-next-defer-unmodeled
page-type-slug: finding
title: "Select next defer unmodeled"
domain-slug: page-type/pipeline
---

# Claim

In `packages/infra/ci/orchestrator`, no `.fizz` spec models a defer/wait/blocked disposition: `grep -ci defer` returns 0 in both `spec/select-next.fizz` and `spec/select-next-placement.fizz`, though the package stands in the Mandatory Coverage Domains set that `.claude/docs/formal-methods.md` names. Every one of the 8 files repo-wide that match "defer" carries it only in comment prose, none as state, transition or assertion.

# Evidence

Split out of #16374 by dalla (her pricing correction — written as part of #16374, priced as mechanical spec extension; it is not).

Both target specs are GENERATED, not hand-authored: `spec/select-next.fizz` from `src/pure/select-next.spec.ts`, `spec/select-next-placement.fizz` from `src/pure/select-next-placement.spec.ts`, via `@shared/fizz-compiler`, paired by path convention (`packages/infra/checks/src/lib/fizz-spec-pairs.ts:38-52`). No `.generated` suffix or marker; `check-fizz-subset` regenerates and byte-diffs. Workflow: edit the `.spec.ts`, run `check-fizz-subset.ts --write`, commit both files, verify with `bun ops spec check packages/infra/ci/orchestrator`.

The compiler does not walk decider function bodies (deferred per `.claude/docs/ts-to-fizz.md:79`); it lowers a declarative `FizzSpecSource`, and the FizzBee body text is hand-authored in TS template literals. Covering defer means designing a model, not transcribing `select-next.ts`.

Suggested shape (undecided): defer as a fourth disposition alongside admit/fail/halt, via a per-candidate disposition partition — the idiom already used in `spec/decide-stale-pod.fizz` and `spec/pod-wedge-decide.fizz`. Properties worth stating, from `select-next.ts:284-296`: exactly-one-disposition over {admit, fail, defer, never-fit-wait, halt}; defer is per-host, unlike the head-of-line halt; a defer creates no pod and decrements no capacity (#14406 C1 bound holds trivially); defer requires a bound candidate; a deferred step holds no reservation and can lose indefinitely to smaller newer steps fitting the gap it cannot (#16374's cause B). `spec/CLAUDE.md:77` records select-next's "Not modeled" axes; defer would amend that line.

The defer path starved two workers in one night, on two nodes and two axes (#16374's instances). Cross-ref #16374: the parent row (three defect fixes landed there); its causes A and B (fan-out-width pin sizing, deferral reservation) remain open and are what this spec would give teeth to.
