---
id: eaa4fddb-fb6c-5327-b928-0d06cfafc68c
page-type-slug: finding
title: "Reliability doctrine name cited by 197 files"
domain-slug: repo/code-repo
---

# Claim

197 tracked files under `packages/` justify their own shape by a doctrine named **Reliability**, which resolves to no document in either repository. It is by far the largest population of this kind yet measured: the existing finding on doctrine names cited without paths records 10 files for *Omit Needless Ink* and 8 for *Error-Body Hygiene*, and calls its own floor unmeasured. The citations are prose rather than paths, so no dangling-citation check can reach them.

# Evidence

Read against `~/code` at `main`, commit `13135651993c19af09ce41b6295264191071d3c1`, on 2026-08-07, while ingesting `dirty/questions/failure-remedy-doctrine.md` — the quarantined document whose Reliability entry was the last record in the estate that this name governs and stands as no unit. That source was emptied and removed the same day, which is why this is filed.

`git grep -l "Reliability" -- 'packages/**'` returns 197 tracked files over 210 lines. None is build output: zero match `/dist/` or `.d.ts`. 25 are test files, so 172 are live source.

The name resolves nowhere. `grep -rn "Reliability" domains/ notices/ settings/ monarch/` in the instructions repo returns nothing, and no `principles/` directory exists. The document that stated it, `dirty/docs/CLAUDE.previous.md` § Reliability, was removed by commit `f6de35720` in the instructions repo.

The citations decide behaviour, not tone, and they state the doctrine's content consistently enough that it is recoverable from them:

    packages/agents/cli/src/agent/skill-token-guard.ts:12
      "the earliest, cheapest, most deterministic rung"
    packages/agents/routing-core/src/wake-armed-seats.ts:15
      "prevent the drift class, not its instances"
    packages/agents/routing-core/src/wake-armed-seats.ts:235
      "prevent the class"
    packages/agents/cli/src/agent/send.ts:189
      "deterministic prevention over instruction"
    packages/infra/ci/orchestrator/src/dispatcher/surface-error-subscribers.ts:22
      "catch issues as early in the chain as possible"
    packages/agents/cli/src/agent/helper-lifecycle.ts:363
      "null fails safe to spawn-fresh"

Two agree almost verbatim with the one-line form the quarantined question distilled — catch at the earliest, cheapest, most deterministic rung, and prevent the class rather than the instance.
