---
id: 291b712d-bdb8-5a8f-8667-aba724b19a54
slug: tool-command-warrant-may-not-exist
page-type-slug: finding
title: "Tool command warrant may not exist"
domain-slug: domain/agent-harness
---

# Claim

`packages/agents/instructions/src/instructions/tool-command.ts` carries no capability warrant, and the reason may be that it has none to carry: it is code-side machinery for reaching the instructions repo, which is the direction the delivery boundary is closing.

# Evidence

Found 2026-08-11 by the seat on #18798, which added the module to `@agents/instructions`' exports for the bridge and correctly declined to write a warrant for a part it had not authored. The file predates that row — last touched by #18075 — so `Warrant Every Part`, which binds on adding and rewriting, was never triggered for it by anyone present.

`domains/capability-warrant.md` governs `packages/agents/**` and its Design says being easier here, being already here, and being written in TypeScript are not warrants. Nothing else on the file names a capability it reaches.

What makes this worth a finding rather than a one-line repair: the honest warrant may not exist. The module is the code-side half of reaching instructions tooling, and #18798 measured that the bridge needs no code-side runner at all — a file in the instructions repo can dynamic-import a code module by absolute path and that module's own bare workspace specifiers resolve, because bun resolves per-file by walking up from the importing file to `code/node_modules`. If the same holds for what this module does, its warrant is not missing but absent, and the repair is a move rather than a docblock.

Writing a warrant for it without settling that would manufacture a justification for keeping a file that the boundary may be about to take. That is the one act `Warrant Every Part` exists to prevent, performed in the name of obeying it.
