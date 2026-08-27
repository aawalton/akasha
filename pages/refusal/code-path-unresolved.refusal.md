---
id: d885f85e-e4a0-5a29-90af-663bb9c05573
slug: code-path-unresolved
page-type-slug: refusal
title: "Code path unresolved"
holes:
  - path
  - named
  - roots
---

# Refusal

`{path}` names `{named}`, which stands in neither repository looked in: {roots}, taken in the order `infra/cluster-checks/src/run-check.ts` resolves a check script, instructions ahead of the code checkout.

Either the file moved and this reference has to follow it, or the reference was never right — whichever it is, whatever reads it fails only when somebody runs it.
