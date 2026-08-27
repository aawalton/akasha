---
id: 8d17bf21-d921-553b-92aa-8e6ddb8519cd
slug: replace-before-removing-interval-unwatched
page-type-slug: finding
title: "Replace before removing interval unwatched"
domain-slug: domain/agent-harness
---

# Claim

`Replace Before Removing` names the order of two acts but nothing watches the interval between them, and the instrument that eventually reports a stranded removal reads the code repository's entry set out of the live instructions repository — so landing the replacement half turns `main` red with no code commit, on a branch belonging to whoever deploys next rather than to whoever left the gap.

# Evidence

Measured 2026-08-15 in `~/code` at `4a19d30759` and in `~/instructions`, from three projects meeting the same shape in one afternoon.

`check-ast-unused` reports six violations on a clean checkout with no local changes: four exports in `packages/agents/cli/src/agent/route-and-delegate.ts` and two in `packages/alanwalton/projects/cli/src/lib/project-stub.ts`. Neither package is on the off-workstation unreached list, so the exports are dead rather than the workspaces.

No code commit caused it. The check's own output states it reads 971 reaches from 1540 files under `tools/` in the instructions repository. The replacements landed there the same day — `tools/lib/route-delegate.ts` at `7b9b0bca4` and `tools/lib/project-stub.ts` at `3f9e85622` — and each severed the last reach into its code-repo original. The code tree was untouched throughout.

Nothing failed when the cause landed: the instructions repo has no gate that could see it, the reach removed being in another repository. The red surfaced on the next branch pipeline, belonging to project #19204, whose seat had changed none of those files and verified against its own base SHA before reporting.

`Replace Before Removing` on `domains/agent-harness.md` binds the order and is silent on the gap between. A replacement landed and never followed leaves dead code reading as live, right up until the last reach disappears — which is the moment it becomes someone else's red.

The population is not one. `@books/book-of-everything` was the first instance, landed and removed on project #19202 the same day. `route-and-delegate` and `project-stub` are the second and third, found only because their failure landed on an unrelated branch. Three in one afternoon is a rate rather than an incident, and nothing in either repository counts them.

It blocks every code-repo deploy. Three projects — #19202, #19204 and #19205 — stood committed and green on everything else, queued behind a red none of their authors produced.
