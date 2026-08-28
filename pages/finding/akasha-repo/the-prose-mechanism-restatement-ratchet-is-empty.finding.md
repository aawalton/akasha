---
id: 69bb3c74-e2ab-5660-9724-a64c12713b55
page-type-slug: finding
slug: the-prose-mechanism-restatement-ratchet-is-empty
title: "The prose mechanism restatement ratchet is empty"
domain-slug: repo/akasha-repo
---

# Claim

`infra/cluster-checks/src/lib/prose-mechanism-restatement.ratchet.json` reads `{"accepted": []}`, so the ratchet an earlier CLAUDE.md census rested on holds nothing.

# Evidence

Measured 2026-08-28 at `229e7c5ea9`. That census, `claude-md-citations-all-dangle`, was removed at `27cf77df`: it counted 412 files and 639 references under a `packages/` tree that holds 0 tracked files here, and named a surviving fixture that returns 0.
