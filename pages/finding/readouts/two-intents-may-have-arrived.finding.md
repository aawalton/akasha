---
id: 4d4a27b0-647e-5b1d-ae35-d64be0a905a0
slug: two-intents-may-have-arrived
page-type-slug: finding
title: "Two intents may have arrived"
domain-slug: domain/global
---

# Claim

Two Intent entries on `domains/readouts.md` may already be true — "A readout with no reading says so" and "A readout's readings reach Alan and nobody else" — and `domains/domain-intent.md` holds that an entry leaves once it is.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `domains/readouts.md` dispatched from `review-documents`. The reading raised it as a question for Alan and kept both entries, judging their arrival his call rather than its own; it is filed here because it was the one thing it raised that it did not file itself.

`domains/domain-intent.md`: "An Intent section holds only what is not yet true… An entry leaves once it is true, or is rewritten into Design where it is one of that section's kinds."

For the second entry: eight readout endpoints under `packages/alanwalton/web/app/routes/` call `guardReadout` — `api.claude-usage`, `api.pipeline-health`, `api.project-counts`, `api.values-stoplights`, `api.habit-stoplights`, `api.categorization`, `api.inbox-stoplights` and `api.persona-stoplights` — counted here rather than taken from the reading.

For the first: the reading reports all nine widgets parting a reading from "No signal" and from "Sign in", with `render-harness/run.sh` asserting the difference rather than assuming it. It ran that harness from this workstation to the macbook and back — 17 cases passed, ten of them coverage cases over every widget and family the sources declare, six reference comparisons at 0.0000% moved.

The section's other two entries are not in question: "A readout is read rather than interrogated" and "Alan is never the instrument that catches a readout being wrong".

Not measured: whether eight endpoints is the whole population, whether `guardReadout` is the only path a reading can leave by, or whether a widget parts the two states in every case the harness does not cover. The reading could not run the decode harness at all — macOS-only, with no ssh leg — so what that asserts is read rather than exercised.
