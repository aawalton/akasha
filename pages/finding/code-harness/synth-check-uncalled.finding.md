---
id: e2c9f46b-f1f6-52ee-ba7c-659d579cd226
page-type-slug: finding
title: "The k8s manifest synth has a drift-check mode nothing calls, refusing with an abandoned workflow"
domain-slug: domain/global
---

# Claim

The k8s manifest synth has a drift-check mode nothing calls, and its refusal text describes a workflow the repository abandoned.

# Evidence

`packages/infra/k8s/cli/src/synth/manifests.ts` carries a `--check` mode that reports drift and exits 1, ending on the words "fix: re-run this with --write and re-commit". Nothing in the repository invokes it. A search for the module turns up one caller, the `preparation-synth-k8s` step in `packages/infra/ci/workflows/src/prep.workflow.ts`, and that one passes `--write`.

Re-committing is not something a reader can do. `.gitignore` line 39 excludes `**/*.generated.yaml`, and `git ls-files packages/infra/k8s/prometheus/generated/` returns nothing, so every generated manifest is produced fresh in CI rather than held in the tree. The mode's instruction names an act its own repository forbids.

The comment two lines above that ignore, at `.gitignore` line 38, says the files are "produced by `bun ops k8s synth` at CI time". There is no `k8s` namespace in the ops dispatcher and no `synth` command under one, so the comment sends a reader after a command that does not exist. What produces them is `bun packages/infra/k8s/cli/src/synth/manifests.ts --write`.
