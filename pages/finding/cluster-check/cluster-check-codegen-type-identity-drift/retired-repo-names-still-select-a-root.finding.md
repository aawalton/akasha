---
page-type-slug: finding
title: "Retired repo names still select a root"
domain-slug: cluster-check/cluster-check-codegen-type-identity-drift
---

# Claim

`infra/cluster-checks/src/lib/codegen-type-identity-drift.ts:5` declares `export type CodegenRepo = "code" | "instructions"`, and both repositories are retired — but here the name is not residue. `repo` is a field on every endpoint, `Roots` is keyed by it at `check-codegen-type-identity-drift.ts:41`, and `readEndpoint` at `:59-70` picks which checkout a file is opened from by that field. `main` builds `code` from `--repo-root` or `WORKSPACE` and `instructions` from `--instructions-root` or `AKASHA_ROOT` at `:147-150`. Collapsing the two changes which files are read wherever those roots differ.

# Evidence

Verified on 2026-08-28; every reference above still resolves at the line given.

`getRepoRoot`, in `infra/cluster-checks/src/lib/repo-root.ts`, takes `WORKSPACE` and requires a `bun.lock` marker. Its refusal, seen in a live run, reads that no code checkout was named and that walking up from the file is no longer done, because the file and the tree it reads need not be in the same repository. `instructionsRootFrom` at `check-codegen-type-identity-drift.ts:43-57` takes `--instructions-root` or `AKASHA_ROOT`, falls back to the repository this file sits in, and requires the instructions mirror directory to stand there.

An agent built the full collapse of the two roots into one, landed it, then reverted it when the scope of its work changed. Its numbers matched before and after only because both roots resolve to the same directory on this workstation. Its words on handing that back are worth keeping: My matching numbers proved the collapse safe here, not safe.

Baseline for anyone who touches this: 29 pairs, 263 strings, 0 drift. The 29 I re-derived on 2026-08-28 — `CODEGEN_TYPE_IDENTITY_PAIRS` at `infra/cluster-checks/src/lib/codegen-type-identity-pairs.ts:38` holds 29 entries, and a live run prints 29 pairs checked. The 263 is printed by nothing; it was measured by loading the registry and calling `extractMembers` over all 29 pairs, and I did not re-derive it.

`pages/finding/repo/akasha-repo/retired-repo-names-remain-in-check-code.finding.md` inventories 240 retired repository names in check code and states that nothing reads the repo segment, the only parser splitting the triple and discarding it. That holds for the graph node ids it counts and does not hold here: this `repo` is a field on a typed endpoint and it selects a root. A reader taking that finding as covering this file would collapse a name that is executing.

Not measured: I did not check whether `WORKSPACE` and `AKASHA_ROOT` name different trees on any machine other than this workstation, and I did not run the check with the two roots pointed at different trees.
