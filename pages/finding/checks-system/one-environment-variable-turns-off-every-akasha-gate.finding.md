---
id: 01a04c72-9e05-7000-b3f6-71d2c8ae5410
page-type-slug: finding
title: "One environment variable turns off every akasha gate"
domain-slug: domain/checks-system
---

# Claim

`AKASHA_CHECKS_RAN=1` in the environment makes every akasha write land ungated. Nothing in the tree sets it, so no run reaches it and no test covers it, but it is read on the one path every gated write passes through, and an environment is inherited by every child. One `export` in a shell, a unit file or a long-lived service turns off every check for everything beneath it, for as long as that process lives, and says nothing while it does.

# Evidence

Read on 2026-08-27 at 23:40 MDT against `main`.

`patches/patch.ts:11` declares `export const GATED = "AKASHA_CHECKS_RAN"`. `repo/land/land.ts:293` reads it inside `akashaGated`:

    292: if (repo !== AKASHA) return
    293: if (process.env[GATED] === "1") return

`akashaGated` is called from `land` at `:329`, and `land` is what `ops write` lands through. Line 292 is the stated design — another repository has no checks to run. Line 293 is not stated anywhere: `pages/old-ops-command/` carries no document naming the variable, and `ops write --help` describes the gate with no mention that an environment can stand it down.

Nothing sets it. Across the tree the name appears three times: the declaration at `patches/patch.ts:11`, its generated `patches/patch.d.ts:2`, and the read at `repo/land/land.ts:293`. No test names it. It was unset in this seat's own environment when I checked.

The usual warrant for such a variable is re-entrancy — a gate that shells out to a writer would need one. That warrant does not hold here. `gateOrRefuse` at `patches/patch.ts:126-146` runs the checks in process and spawns nothing, so no descendant of a gate run needs to skip the gate.

What makes this worth recording with no caller is where the hazard sits. It is not a mistake somebody might make in a file; it is a property of the mechanism, and the failure it produces is a write that reports success, names its commit, and was judged by nothing. A gate that can be switched off from outside the repository is indistinguishable at its output from one that ran and refused nothing.

Not measured: whether any harness, hook or CI container sets it in an environment this tree does not contain.
