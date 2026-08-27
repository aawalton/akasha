---
id: bab1903b-7f3e-54ce-86a0-a8fbf035486f
page-type-slug: finding
title: "Eso path pinned in help"
domain-slug: domain/ops-cli
---

# Claim

Ten `ops temper inventory` verbs render the ESO SavedVariables path into their help block, and it is now a literal pinned here rather than what `savedVarsFile` computes — so a machine whose ESO tree stands elsewhere is told a default that is not the one it will use.

# Evidence

`savedVarsFile` reaches `@temper/shared-foundation-misc-eso-paths-resolve`, which reads `ESO_LIVE_DIR` and `HOME` and, on win32, probes the filesystem. It is a capability, and a capability cannot be reached from a help block: `codeModule` is async and the dispatcher imports every verb's file at module load to render a usage screen, so a top-level resolution would open the seam to print `--help`. The path is therefore pinned at `tools/lib/temper-inventory-paths.ts` as `TEMPER_INVENTORY_LUA` and `TEMPER_CHARACTERS_LUA`, spelling this workstation's Proton prefix.

On all ten the pin is presentational only: the body reads `parsed.string("--inventory-path") ?? await savedVarsFile(...)`, so the runtime path stays computed and `ESO_LIVE_DIR` still moves it. Only the printed sentence can go wrong. Nothing reports the divergence, because `ESO_LIVE_DIR` is unset on this workstation and both readings agree today — a check comparing them would be measuring nothing.

An eleventh verb, `ops temper inventory rules`, took the pin into its behaviour: its flag declares `default: TEMPER_INVENTORY_LUA` and its body read `requireString`, so the parser handed back the literal and `ESO_LIVE_DIR` stopped moving it. That one was a change the move introduced rather than one it carried across, and it is closed at `c622bb97e` — the body now detects whether the flag was supplied and otherwise calls `savedVarsFile`, which leaves the rendered help byte-identical. Proved with `ESO_LIVE_DIR` set to a scratch tree against a pre-move worktree: twelve behaviour cases identical on both sides, set and unset.

The same pin serves `auto-quest trace` and `errors list` for `TemperQuests.lua` and `TemperErrors.lua`, inlined at those two sites rather than named here, each having one consumer.
