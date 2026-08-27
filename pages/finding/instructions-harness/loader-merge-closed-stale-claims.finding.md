---
id: 99c11443-260b-55d5-932e-72c57b82e850
slug: loader-merge-closed-stale-claims
page-type-slug: finding
title: "Loader merge closed stale claims"
domain-slug: domain/global
---

# Claim

Project #17427 (domain `instructions-harness`, part of the instruction-loader initiative #17367) merged branch project-17427 with project-17353 as commit `86d993f1e1`, resolving one add/add conflict on `send.help.ts` in favor of 17353's strict superset, then closed three stale claims in `initiatives/instruction-loader.md` per Alan's ruling that reproduced counts should not be carried at all — leaving six open items, none of which has started.

# Evidence

Project #17427, domain `instructions-harness`. Work of the instruction-loader initiative (project #17367). Recovered after the deriving seat (manage-17427, `019fbc9d`) died mid-setup; this row was re-claimed from it.

Branch: project-17427 = origin/main (`77685cfbf5`) merged with project-17353, landed as merge `86d993f1e1`. One add/add conflict on `packages/agents/cli/src/agent/send.help.ts`, resolved to 17353's version, a strict superset (adds `irreversible`, a CommandHelp field only 17353's help.ts declares). `tsc -b` exits 0.

CLOSED, in instructions commits `5ef05de1` then `631eec60`: the three stale claims (quarantine counts, "every gate skips them", matcher tally), then Alan's ruling that the counts are a Reproduced Count violation and should not be carried at all. `initiatives/instruction-loader.md` is now stripped of every reproduced count and trimmed to remaining work — decision archaeology, measurement narratives and retired mechanisms removed. Then cut again in `22eae825` to the remaining work only: the built mechanism is no longer described, because a prose copy of the hooks and gates is a second authority that drifts, which is how the stale claims got there twice. Each open item now states what verifies it. 5716 bytes against the 15000 ceiling, from 14859 originally.

OPEN, and none started:
- confinement absent until project-17353 lands and supervisors restart. Alan is watching this and will say when it lands. NOT to be worked here.
- no retirement signal for the user-tier settings copy; the condition for collapsing the two files is unobservable.
- the matcher-dispatch measurement has no standing form; a standing one needs a hook inside every registered chain, and this repo does not own one in every chain.
- the cwd-free loader is unbuilt, and no condition is stated for taking the cwd-rooting scaffolding down.
- a spawn whose --agents definitions fail to load is announced only on the supervisor's stderr, where no later reader looks.
- corpus authorship is the thin part, not the loader.
