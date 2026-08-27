---
id: c45ef819-cce5-5a89-9419-4f92b73d1ed2
page-type-slug: finding
title: "A lost door is named after it is already gone"
domain-slug: domain/global
---

# Claim

A verb can stop existing in this repository at any commit, and the instrument that notices runs in the other repository's branch CI — so the door is already off every shell by the time anything names it.

# Evidence

The door set is derived live: a tool under `tools/` declaring `door:` is a verb, and the deployed `ops` reads this repository at call time rather than at deploy time. A commit that drops the line therefore takes the verb off every seat's shell immediately, with no deploy standing between.

`check-doors-kept`, landed by #17947, compares this repository's history against its tree and names any verb that went. It is registered in the code repository's branch-CI check workflow under `alwaysRun`, so it fires when a code branch next runs — which may be long after the instructions commit that caused it.

`ops instructions run-checks` does not include it, and cannot reach it: `tools/lib/gate.ts` bounds a gate to one file, and reaching the derivation from here would be a dynamic import out of a code checkout on every write, the dependency direction `One-Way Dependency` forbids.

The derivation sits in `packages/agents/instructions/src/instructions/door-set.ts`. Moving it into this repository's own `tools/lib/` and having the code repository call it there would put the check on the same side as the commits it judges, keeping one parser — but that is a design pass rather than an observation.
