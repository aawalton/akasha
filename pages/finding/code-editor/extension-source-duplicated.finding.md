---
id: 00af09a5-b757-587e-ad45-5b0d39333723
slug: extension-source-duplicated
page-type-slug: finding
title: "Extension source duplicated"
domain-slug: domain/code-editor
---

# Claim

The ops extension's source stands twice, and only one copy reaches Alan. `extensions/ops/src/` in the editor repository is what `tools/promote.sh` bundles and ship; `packages/agents/vscode-extension/src/` in the code repository is a copy that reaches nothing. They have already diverged, and a change made to the wrong one typechecks, tests clean and does nothing.

# Evidence

Measured 2026-08-13 while verifying #18955.

`seat/terminal-lookup.ts` exists at both paths. Diffing them shows more than formatting: the editor copy carries a `PS_TIMEOUT_MS` bound on the `ps` subprocess that #18954 added, and the code-repository copy does not. The editor copy then gained the whole tmux join arm under #18955 (`loadTmuxClients`, `tmuxSeatNameForShellPid`, `findDescendant`), and the code-repository copy still spells `findSupervisorChild` with one arm.

Nothing in the build reads the code-repository copy. `tools/promote.sh` bundles `extensions/ops` out of the editor checkout, and that bundle is what lands in `code-editor-live`.

#18955's brief warned its seat about this explicitly and the seat edited the right one, so the trap has been seen and stepped over rather than fallen into. What is not settled is whether the code-repository copy should be updated, deleted, or left where it is.
