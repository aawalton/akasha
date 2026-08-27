---
id: 35e805d6-5c1d-5317-a5cf-26d959b3f769
slug: import-search-cannot-see-the-seam
page-type-slug: finding
title: "Import search cannot see the seam"
domain-slug: domain/agent-harness
---

# Claim

A dependency search over this estate that follows imports and file references misses the crossings that matter, because the seam between the two trees is built out of subprocess calls rather than imports, and reports the clean answer rather than an inconclusive one.

# Evidence

Two measurements taken by the agent-harness lead, five days apart, failed the same way.

On #17766 the claim was that no hook script takes a build-time dependency on the code repository. It was drawn from a search of the hook scripts for imports and paths reaching into that tree, which found none. `packages/infra/scripts/block-shell-active-prose-flag.sh` takes one: line 54 sets `SELF_PATH="${BASH_SOURCE[0]}"`, line 59 `exec`s `"$SELF_DIR/src/block-shell-active-prose-flag.ts"`, and that decider imports `zod` and `@shared/utils-narrow/validate` and reads a 28,842-byte generated JSON in a different package. The wrapper names none of it. A dispatched seat was cut on the wrong premise and lost.

On #17772 the claim was that `ops seat start --task` is not checked against the task corpus, so the `valueIn` coherence rule was the only thing preventing a seat being minted onto a task that does not exist. It was drawn from a search of the spawn path for a corpus import, which found none. `spawn.ts:293` calls `resolveStatedIdentity`, whose axes include `task`, which shells `bun tools/pin.ts --resolve` and refuses the spawn on a non-zero exit. Verified: `bun tools/pin.ts --resolve --task not-a-real-task-xyz` exits 1 and names the tasks that resolve. The check has stood since `493614e34a` of 2026-08-02, two days before the measurement. Two of that row's four objectives were already met when it was cut.

The estate makes this structural rather than careless. Every `ops instructions` and `ops memory` verb is a door that spawns `~/instructions/tools/<verb>.ts` rather than importing it, because the instructions tree carries no `package.json`, no lockfile and no `node_modules`. Crossing by subprocess is the architecture, so the one search that cannot see a crossing is the one most naturally reached for.

Not measured: whether any tool in the estate resolves a subprocess edge, and whether other seats' measurements show the same shape — both instances here are one agent's.
