---
id: a6adea39-99b5-5a86-8a92-4691bfa5e1d7
slug: promote-unlocked
page-type-slug: finding
title: "The promote script takes no lock, so two concurrent promotes destroy each other's build and server"
domain-slug: repo/code-editor-repo
---

# Claim

`tools/promote.sh` takes no lock, so two agents promoting at once share one staging checkout, one container name and one port, and the later run silently destroys the earlier one's build and server.

# Evidence

Two `promote.sh` runs stood at once on 2026-08-19, started from two seats about twenty minutes apart. Both drove `~/repos/code-editor-staging`, both ran `tools/gate.sh --skip-compile` out of it, and both used port 9893, so both addressed a container named `ovsc-gate-9893`.

The earlier run had compiled clean, bundled the ops extension and passed the wholeness measure at 5145 emitted modules, and had been in `== driving the built workbench ==` for nineteen minutes. The later run then reset the staging checkout from `cd74d2a` to `90c7e69` and created a fresh `ovsc-gate-9893` at 07:28:43, under the first run's live browser gate. The first run's `browser-console.log` stopped being written at that same minute and never resumed; its `browser-gate.mjs` was still standing twenty-seven minutes in with nothing to talk to.

Neither run reported the collision. The first would have reported a gate failure, which reads identically to a build that genuinely failed the measures.

`cleanup()` at `tools/gate.sh:43` is `podman rm -f "$CTR"`, and `$CTR` is composed from the port alone, so it names the same container in both runs. That makes the ordinary teardown of either run a teardown of the other, and it makes killing a wedged run destructive: a SIGTERM there fires the EXIT trap and removes the container the surviving run is driving. The wedged run was killed with SIGKILL to step past the trap, and the survivor's container was verified still up afterwards.
