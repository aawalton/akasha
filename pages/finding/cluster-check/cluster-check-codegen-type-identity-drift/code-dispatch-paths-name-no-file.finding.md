---
page-type-slug: finding
title: "Code dispatch paths name no file"
domain-slug: cluster-check/cluster-check-codegen-type-identity-drift
---

# Claim

The dispatch table for this check carries the same retired repository vocabulary in every node id, and the two halves have drifted apart. `tools/lib/check-workflow/check-configs-codegen.ts:27-77` lists 25 `ts-file:instructions:` node ids and 26 `ts-file:code:` ones. Every `instructions:` path resolves under akasha. No `code:` path does: all 26 sit under `packages/temper/...`, and akasha holds no `packages/` directory and no `temper/game/...` layout — the files they mean stand under `temper/game-characters-.../src/generated/`. Whether the table still fires the check on a change is not established.

# Evidence

Checked on 2026-08-28. The file holds 28 `ts-file:instructions:` ids — 25 in the `codegen-type-identity-drift` entry at `:27-51`, and 3 in `LCCC_VENDOR_DRIFT_INPUTS` at `:5-9` — and 26 `ts-file:code:` ids, all at `:52-77` and all under `packages/temper/`.

Resolved by hand: `infra/cluster-checks/src/lib/codegen-type-identity-pairs.ts`, `tools/lib/temper-addon-data/generators/rule-types.ts` and `tools/lib/temper-addon-data/generators/temper-skill-bars.ts` all stand where the `instructions:` ids name them. `packages/` stands nowhere in akasha. `temper/` does, flattened: `temper-skill-bars.generated.ts` stands at `temper/game-characters-skills/src/generated/`, and `temper-character-role.generated.ts` at `temper/game-characters-character/src/generated/`. So the drift is two-fold — the `packages/` prefix, and the nested `game/characters/...` shape underneath it against the flattened `game-characters-...` one that exists.

Two findings already carry parts of this and neither names this file. `pages/finding/repo/akasha-repo/retired-repo-names-remain-in-check-code.finding.md` inventories 240 retired repository names in graph node ids under `tools/lib/check-workflow` and `infra/cluster-checks`, and holds that nothing reads the repo segment. `pages/finding/akasha-repo/fallback-candidate-reach-unreported.finding.md` re-measured `ts-file:code:packages/` on 2026-08-27 at 109 occurrences across 33 files and records that akasha holds no `packages/` directory at all.

What neither covers, and what this is filed for: the mixed state inside one array. The `instructions:` half of this table points at files that exist, so the prefix is not uniformly dead text here, and the `code:` half is stale in a way a prefix rewrite alone would not fix.

Not measured: I resolved three of the 25 `instructions:` ids and located two of the 26 `code:` targets rather than all 51, and I did not run the workflow, so whether these nodes are consumed at all, and whether a change to any of these files still wakes the check, is unestablished.
