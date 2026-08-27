---
id: 876efdc5-27ce-5130-8224-f839797e64b7
slug: some-states-clear-without-an-act
page-type-slug: finding
title: "Some states clear without an act"
domain-slug: page-type/refusal
---

# Claim

Some refusal bodies have no act because the state clears itself: `hook-dropped-since-launch` prints under an advisory about a divergence that goes when the seat cycles, so there is nothing its reader could do and nothing the text is withholding.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `refusals/hook-dropped-since-launch.md` dispatched from `review-documents`. The reading carried it back rather than writing a line into the document.

The repaired body ends: "`settings/agents.json` registered that hook when that seat started and has since dropped it; it goes when the seat cycles and nothing written here reaches it." The arm that prints it is `extra.selfClearing` in `tools/checks/hooks-delivered.ts` — a registration the payload holds that the settings document held at launch and does not hold now — established by `bun test tools/tests/hooks-delivered.test.ts`, 14 passing.

This is a fifth distinct answer to why a refusal body names no act, and the only one where the honest answer is that no act exists. The four already filed are: the schema's sentence may be wrong for check bodies (`one-schema-over-two-kinds-of-body`); the printer hands over too little to write one (`remedy-blocked-by-what-the-check-passes`); several acts are available with no instrument choosing (`too-deep-has-three-remedies`); and the whole question being unsettled at the schema (`remedy-unsettled-at-the-schema`).

It bears on the first of those. If a body printed under an advisory about a self-clearing state is right to name no act, then the schema's "wants the act they can take next" is describing one kind of body rather than all of them.

What the reading left open: whether such a body should say "no act is owed" outright. Adding it grows what every reader of the check's output pays for, and it is judgment.

Not measured: how many of the 118 bodies print under an advisory rather than a stop, or how many describe a state that clears without anyone acting.
