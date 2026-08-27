---
id: a8dfe5e0-3f3b-52b3-b32e-153d26dc16cb
slug: registry-comment-false
page-type-slug: finding
title: "Registry comment false"
domain-slug: domain/ops-cli
---

# Claim

The header comment on `packages/shared/cli/src/ops/registry.ts` in the code repository is false. It says the dispatcher "loads this module by name at runtime". The dispatcher builds its command set from `declaredCommands()` and `forwarderCommands()` and nothing else; `grep -rn registry tools/ops/` finds no reference, and the first tokens of `ops --help` come out as the declarations plus the `instructions` and `memory` forwarders exactly. The registry is data nothing dispatches from.

# Evidence

Raised by the reviewer seat `claude-ops-archivist-review-instructions` on 2026-08-13, reading `domains/ops.md`. Its report is at `~/agents/claude-ops-archivist-review-instructions/review-ops.md`.

The same measurement retired two Design lines on that document as false — one asserting that a verb declared in the instructions repo shadows the code repository's for the same path, and one asserting a fallback to that set. Both were cut (`167411b5f`), and the dispatcher line was repaired to say the registry is data nothing dispatches from (`469e30046`).

The seat did not land a change to the comment, it standing in the code repository rather than this one. I did not re-run its searches.

Not measured: whether anything else in either repository still describes the registry as a dispatch source, and whether the registry has any live reader at all.
