---
id: 32202b79-c557-57b7-9411-5cca8f7de360
slug: code-reaches-instructions-by-file
page-type-slug: finding
title: "Code reaches instructions by file"
domain-slug: domain/agent-harness
---

# Claim

Thirty-five files in the code repository reach the instructions tree as files, and nine of them were built by #18768's own children while carrying out that tree's objective. Each puts a decision in the instructions repository and then opens it with a dynamic `import()` of a composed absolute path, which is the one thing the tree's second criterion forbids. #18798's subprocess bridge is the same seam with no file crossing between the repositories.

# Evidence

Measured 2026-08-11 on branch `project-18768` at `/home/walton/worktrees/18768`, over all of `packages/`, excluding `dist/` and tests. Searched for `createRequire`, `findInstructionsRoot`, `loadInstructionsDeclaration`, `INSTRUCTIONS_ROOT` and the literal `instructions/tools`: **35 distinct files**. Heaviest are `supervisor-decide-seam.ts` (6) and `agents/instructions/src/lib/instructions-repo.ts` (5), then nine files at 3 apiece.

THE MECHANISM, read rather than inferred. `packages/agents/shared/instructions-declaration.ts` composes `where = join(root, relativePath)` and returns `{ loaded: await import(where), where }` — an import of a module out of the instructions tree, from a path built at runtime.

ITS CALLERS, five sites over four modules: `agent/send-recipient-rule.ts` 30 and 187, `shared/blocked-principal-rule.ts` 28 and 139, `shared/domain-lead-rule.ts` 27 and 141, `projects/cli/src/project/status-options.ts` 51 and 124. The first three are #18774's own landings, each declaring a `DECLARATION_RELATIVE_PATH` naming a `tools/lib/decide-*.ts` file.

THE SUPERVISOR'S IS THE SAME SHAPE, filed at `8e40489f`: `supervisor-decide-seam.ts` line 70 builds `requireDecision` off `findInstructionsRoot()` against `DECISION_DIR = "tools/lib"`, and twelve files reach it.

WHY IT IS INVISIBLE AS AN IMPORT. Inside the instructions repository, `tools/lib/recipient-derivation.ts` has exactly one importer — its own test — and `tools/lib/decide-verb.ts` has none. Both are nonetheless loaded, because a dynamic `import()` of a composed path leaves no import statement to find. A module reads as unused at the moment code is loading it.

THE CONTRAST. #18798's bridge was verified live the same day: `ops app deployed-url --nosuchflag` answers with text occurring 0 times under `packages/` and twice under `~/instructions/tools/`. The agent-facing words came from the instructions repository over a subprocess carrying JSON, with no file crossing either way.
