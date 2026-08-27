---
id: c1ef6e60-da1c-52e0-bbbf-5ceec35f6455
page-type-slug: finding
title: "A gate flags the ordinary adjective binding on every write to a file whose line is correct"
domain-slug: domain/global
---

# Claim

A gate flags the ordinary adjective "binding" in `domains/agent-harness.md` against the retired domain `binding` on every write to that file. The use is "two binding documents have none", in the Single Authority rule's description, which `page-types/retired-domain.md` expressly allows: a retired domain's word may still stand in older text. The line is correct, so the flag fires on every write and settles nothing.

# Evidence

Seen while running `ops instructions run-gates --file-path domains/agent-harness.md` during the review-instructions reading of that document on 2026-08-19.

Measured: this one word on this one file. Not measured: how many other files carry a retired word in its ordinary sense and draw the same flag, and whether the gate has a way to be told a use is the ordinary one.
