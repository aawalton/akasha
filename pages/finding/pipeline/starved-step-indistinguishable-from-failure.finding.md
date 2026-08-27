---
id: c2e64ad0-c27a-5076-92ec-feaa6735085c
slug: starved-step-indistinguishable-from-failure
page-type-slug: finding
title: "Starved step indistinguishable from failure"
domain-slug: page-type/pipeline
---

# Claim

A CI pipeline step starved to a launch timeout renders on the pipeline row identically to a real failure — zero checks executed, workflow "blocked," status "failed" — and the distinguishing fields, `dispatchWaitReason=node-capacity` and `dispatchWaitNode`, are written to the step page row but are not surfaced by `pipeline show` or `pipeline steps`, reachable only by querying `public.pages` directly.

# Evidence

A CI pipeline step that starves for a node and hits its launch timeout is indistinguishable, on the pipeline row an agent normally reads, from a step that ran and genuinely failed: zero checks executed, workflow state "blocked," step status "failed." The only fields that tell the two apart — `dispatchWaitReason=node-capacity` and `dispatchWaitNode` — are written onto the step's own page row at the time it starves, but neither `pipeline show` nor `pipeline steps` surfaces them; the only way to see them today is to query `public.pages` directly for that step's row.

Effect: an agent (or a person) reading a starved step through the normal CLI surface has no way to tell "this genuinely broke" from "this never got a node," and will diagnose or retry as if it were a real failure.

No fix proposed or decided; this is the observation as filed.

Project #16300, someday_maybe, domain pipeline. Captured, never formally defined; moved here off the row's retired `notes` attribute on 2026-08-15.
