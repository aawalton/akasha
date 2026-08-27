---
id: 4dd551e5-42c7-5b3b-a645-85a9f0bd7c8f
page-type-slug: finding
title: "Talos bare names legacy alias"
domain-slug: domain/technology
---

# Claim

The Talos node manifest at `packages/infra/talos/src/nodes-main.ts` declares six extension names (`siderolabs/nonfree-kmod-nvidia`, `siderolabs/nvidia-container-toolkit`) that are not in the official Talos extension listing for v1.12.9 and build only because Talos's factory still resolves them as undocumented legacy aliases for the `-lts` names — a condition owned externally and recorded nowhere in the repo.

# Evidence

From project #16013 (domain `technology`, status `someday_maybe`, captured 2026-07-25, never given an objective). Found by #16002's worker while discharging its Condition 3, flagged as out-of-fence there and correctly not worked; filed as this row instead.

`packages/infra/talos/src/nodes-main.ts` declares, six times: `["siderolabs/nonfree-kmod-nvidia", "siderolabs/nvidia-container-toolkit"]`. The official extension listing for v1.12.9 lists only `-lts`/`-production` variants; the bare names are absent from it yet still build (installer manifest returns 200). Control: a genuinely invalid name returns HTTP 400. Traced chain: bare-name declaration, schematic id, live node annotation; the live node reports the `-lts` variants installed, so resolution happens inside the Talos factory. Confirmed benign today, not drift.

Worth recording because the bare names survive only as legacy aliases absent from the current official listing, and nothing in the repo records that. If a future Talos minor drops the alias it surfaces as HTTP 400 at upgrade time, not at review or CI, on node-06 (bare metal, no IPMI, no out-of-band recovery). Same shape as #15999 (a carve-out recording the decision but not the condition), worse here because the condition lives in a third party's changelog.

Second, transferable finding: the schematic POST that mints a schematic id validates nothing, minting an id for the invalid name too. Only the installer-manifest fetch discriminates validity.

Candidate work, not decided: (1) move to explicit `-lts` names, touching all six nodes and re-deriving every schematic id; (2) leave the names, add a check fetching the manifest per schematic, failing loudly on non-200; (3) record the condition regardless. Project's guess was (2)+(3); flagged (1)'s blast radius as needing its own reasoning.

Do not bundle with #16002 (fenced to node-06) or #15805; this touches all six nodes or adds a repo-wide check.
