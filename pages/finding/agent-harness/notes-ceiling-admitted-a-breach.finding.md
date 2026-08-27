---
id: f28d97ff-1b57-5d83-a8e3-aa449f806492
page-type-slug: finding
title: "Notes ceiling admitted a breach"
domain-slug: domain/agent-harness
---

# Claim

A project document landed in the memory repo with its `# Notes` section at 8,447 characters against the 5,000 that the `project` schema declares for it, so the gate whose job is refusing non-conforming writes admitted one. The cost falls on the NEXT writer rather than the one who caused it: every subsequent edit to that section is refused for an excess it did not create.

# Evidence

Measured 2026-08-10 on project #18575, at the manager's verification of a developer hand-back.

`tools/document/schemas/project.ts` line 149 gives the `Notes` section `maxChars: XXXL`, and `tools/document/tokens.ts` line 25 defines `XXXL = ceiling(5000)`. Counting the file on disk from the end of the `# Notes` heading gave 8,447 characters — 69 percent over — in a file of 9,331 bytes. The section had been rewritten by the delivering developer and was committed and pushed.

The failure surfaced only when the manager tried to add a verdict to that section, as `verify-handback` requires. `ops memory edit` refused the write, reporting `# Notes — expected at most 5000 characters, measured 10810`, the figure including the addition. So the refusal named the manager's edit while the breach was already in the file, and the only way to land a verdict was to rewrite a colleague's section down to 4,676 characters first.

Two smaller readings from the same session, consistent with a ceiling that is checked but not exactly at its stated value: a `# Notes` of 5,123 characters was refused and one of 5,038 was admitted, both against the same declared 5,000.

Not established: how the over-ceiling write landed — whether by a path that does not gate, a gate that checks only changed parts, a tool other than `ops memory edit`, or a change to the ceiling after the file was written. Nothing here identifies the mechanism, and the developer was not asked.
