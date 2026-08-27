---
id: bdf8291f-00d9-5011-98d7-fd3bf1e70e45
slug: governs-under-reports-from-a-subdirectory
page-type-slug: finding
title: "Governs under reports from a subdirectory"
domain-slug: domain/global
---

# Claim

`governs.ts` resolves `--file-path` against the caller's directory, so from anywhere but a tree root it silently reports fewer governing surfaces than actually bind the path.

# Evidence

Measured 2026-08-04 on `tasks/projects/build-parent-deploy.md`, the same argument in three working directories.

From `/var/home/walton/instructions` (the tree root) it answers correctly: six surfaces — `domains/agent-harness.md`, `domains/global.md`, `domains/memory.md`, `domains/project.md`, `domains/task.md`, `folders/instructions-repo.md`.

From `/var/home/walton/instructions/tasks/projects` it printed the header `tasks/projects/tasks/projects/build-parent-deploy.md (instructions)` — the relative path appended to itself — and listed THREE surfaces: `domains/agent-harness.md`, `domains/global.md`, `folders/instructions-repo.md`. It did not error. The three it returns are the generic ones any path under the root inherits; the three it drops are exactly those reached through the document's own `domain-parents: [project, task]`.

From `/var/home/walton` it exits 1 with "tasks/projects/build-parent-deploy.md sits in neither tree".

So the failure mode is ordered by how wrong it looks: the far cwd fails loudly, the near cwd fails silently, and the silent case is the one a seat working inside the corpus will hit.

The consequence is specific rather than general. Under-reporting governance is what the `read-what-governs` gate exists to prevent, and that gate's own remedy text names this command as the way to get the list — "`bun ~/instructions/tools/lib/governs.ts --file-path <p>` prints the same list at any time". "At any time" is true; at any place is not. A seat that runs it from where it is working, reads the three surfaces named, and returns to write will be refused by the gate for the three it was never told about.

Not verified: whether the gate itself resolves paths the same way, or only the standalone command. The gate refused correctly in every case observed today, so the defect may be confined to the CLI entry point.
