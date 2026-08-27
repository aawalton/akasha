---
id: 209ae14d-9427-5223-afc9-f35a7c3b75fe
slug: surface-versus-document
page-type-slug: finding
title: "Surface versus document"
domain-slug: task/handle-inbound
---

# Claim

The instruction corpus and the CLI name one thing two ways, and the code is the outlier. The prose says "the delivered document"; the flag is `--surface-file` and its help reads "delivered SMS surface". Commit 4d54e919 changed surface to document across 21 instruction files deliberately, so the prose is the standing convention and the interface is what has not followed. Ubiquitous Naming is open at the code's end.

# Evidence

Raised by the review-instructions seat on `domains/tasks/handler/handle-inbound.md`, which named the direction rather than changing either side — repointing a CLI flag is a code change and outside a reading of an instruction document.

The commit reference and the 21-file count are the reviewer's. I did not read 4d54e919 or run the flag's help.

Not measured: how many call sites the flag has, which is what the repair would cost.
