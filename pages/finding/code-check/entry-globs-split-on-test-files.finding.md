---
id: 52e26804-1d2a-5311-8b46-1e0507caa568
page-type-slug: finding
title: "An unused export means two different things depending on the workspace"
domain-slug: domain/global
---

# Claim

`check-ast-unused` roots its reach graph in per-workspace entry globs, and roughly half the workspaces declare their test files as entries while the other half do not. An export used only by its own test is a violation in one workspace and clean in the next, with nothing stating which answer is intended.

# Evidence

Measured here on 2026-08-17 against `ast-unused.config.json` at `ca2ff8490e` in the #19315 worktree. Of 183 workspaces, 90 declare a glob matching test files as an entry and 93 do not. The split is near-even, so neither side reads as the convention and neither as the exception.

Found because #19321 hit it. `packages/agents/shared` keeps its modules at the top level rather than under `src/`, so its glob `*.ts` matched its test files incidentally; moving one test into a subdirectory dropped it out of the entry set and raised a violation on an export that had been reached the whole time.

That is the shape of the cost: the reach a workspace grants its tests can depend on where its files happen to sit rather than on anything anybody decided, and a file moving between directories changes what the check concludes about code nobody touched.

Not judged here: which of the two answers is right. Counting tests as entries forgives an export only its test uses; not counting them catches that export but reports one every time a test is the only cross-module consumer of something deliberately exported for testing. `Derived Reach` on `domains/code-check.md` bears on it — a per-workspace list is the kind of list a new member arrives outside of.
