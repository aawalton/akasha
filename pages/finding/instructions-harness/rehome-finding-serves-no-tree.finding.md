---
id: c35b88f8-2f5d-5e1c-8937-7af3048c92f1
page-type-slug: finding
title: "Rehome finding serves no tree"
domain-slug: domain/global
---

# Claim

`ops instructions rehome-finding` can no longer serve any call: it addresses the instructions root alone, findings now sit in the memory tree, and `tree-agrees` refuses every path it can be pointed at.

# Evidence

Measured 2026-08-04, immediately after #17598 moved the corpus into `~/memory`.

`tools/rehome-finding.ts` resolves `resolveRoots()` with no tree and reads its subject at `${roots.instructions}/${at}`, so every finding it can name is one in the instructions tree. `findings/` does not exist there any more. Pointed at a path that does exist in the memory tree it refuses at the door: `tree-agrees` fails with "1 schema claim(s) put this path in another tree", and `tools/tests/rehome-finding.test.ts` now asserts exactly that under `# what a rehome lands`.

Giving it `--tree` is not the whole repair, and that was measured rather than assumed. `tools/lib/rename.ts` takes `roots.instructions` at two sites, and past those `tools/lib/repoint.ts` takes it at six — the surface survey, the link resolution and `identityEdges`, which reads `domain-parents:` and `persona-champion-slug:` off frontmatter no memory document carries. `tools/lib/mention.ts` and `tools/lib/notify-readers.ts` take it at one and four. A `--tree` flag alone reaches `landRename` and then throws ENOENT out of `identityEdges`, which is what a first attempt did.

`ops instructions mv` is in the same position for the same reason, though nothing was routing memory documents through it.

What this costs today: a finding whose `domain:` key and folder disagree — the state `findings-sorted` exists to report, and which is now levied over the memory tree — is repaired by an `ops memory write` at the new path and an `ops memory rm` at the old, in two commits, with the key spliced by hand. Not measured: whether any finding is presently in that state.
