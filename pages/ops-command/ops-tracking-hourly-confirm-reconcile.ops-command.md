---
id: 5beb1703-a9c1-5169-8a86-2951df2700ca
page-type-slug: ops-command
title: "Ops tracking hourly-confirm-reconcile"
slug: ops-tracking-hourly-confirm-reconcile
domain-parent-slug: domain/ops-tracking
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/tracking/hourly-confirm-reconcile.ts
path: tracking hourly-confirm-reconcile
---

# Definition

- **Ops tracking hourly-confirm-reconcile** — stamping a question's answer as applied, which lets the hourly stream ask again.

# Help

Record that a question's answer has been applied to the tracking ledger, which is what lets the hourly stream start again.

APPLYING the answer is not this command's job and deliberately so — a custom answer needs a human read of which boundary Alan's words name, and that stays yours over `tracking switch` / `log` / `edit`. This is only the closing act: it stamps `reconciledAt`, which the emitter reads to tell an answer that has been applied from one still outstanding.

The emitter cannot infer that for itself, and the attempt is what broke: a guard reading whether the block starts after the answer only ever clears for the tapped reactor, which writes the block start at the answer instant. A custom answer exists precisely to name a boundary in the past, so for the one path it matters on, the inference is wrong by construction.

Run `ops tracking hourly-confirm-pending` to see what is outstanding.
