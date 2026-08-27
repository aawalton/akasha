---
id: 3e03c9d2-bef1-56cb-a923-9099256411f5
slug: explainer-shares-the-verdicts-model
page-type-slug: finding
title: "Explainer shares the verdicts model"
domain-slug: domain/instrument
---

# Claim

A diagnostic built from the failing verdict's own model cannot falsify it: a reader seeing *verdict says wedged, diagnostic says not parked* sees two instruments agreeing where there is one, and the second arrives wearing the authority of a different tool. `pages/domain/instrument.domain.md` carries Negative Control and Population, both about a single instrument's blindness, and nothing about two instruments sharing a model.

# Evidence

A standing ruling of 2026-07-28, held in `dirty/skills/agent-harness/rulings/instruments.md` and reached by an ingest seat emptying that source. The ruling's own record of the incident: a verdict read `wedged` on a healthy, correctly-parked seat; the tool that exists to explain away a false wedge checked exactly one notion of parked and was blind to both project-status parks, so it would have returned `eventParked: false` and confirmed the false verdict. What actually worked went to unrelated surfaces — the seat's children's row statuses, its recent commits — precisely because those do not share the wedge pipeline's model of parked. The ruling's operational test: before trusting an explainer, ask what it reads that the failing verdict does not; if the answer is nothing, it is a restatement.

The machinery is gone and the judgment is not. `rg -uuu -l "eventParked"` over the code repo exits 1 with no matches, so the diagnostic measured that day no longer stands; `git ls-files | grep -i wedge` shows the wedge family alive at `packages/agents/devops-monitor/src/wedges/`, so the subject persists while the specimen does not. That package is gone too: on 2026-08-27 the only tracked wedge source in akasha is `tools/lib/ci-container-reaper/wedge.ts`, and `eventParked` matches this page and nothing else.

Nothing in the live estate carries the claim. `pages/domain/instrument.domain.md` holds Negative Control ("Make an instrument fail before you trust it. A blind instrument and a clean one both return nothing") and the Population rule; both bind one instrument against its own blindness. `domains/role.md`'s Secondhand binds a reporter rather than an instrument. `rg -n -i "independen|corroborat|second reading|blind spot|echo" domains/` returns nine lines, none of them this. The same reading holds over what replaced that corpus: on 2026-08-27, `explainer`, `blind spot`, `corroborat`, `two instruments`, `restatement` and `second instrument` across all 1162 tracked `*.domain.md`, `*.page-type.md`, `*.command.md` and `*.role.md` pages matched nothing. In this corpus I searched `explainer|shares a blind spot|share a blind|same model as the thing|restatement`, then `second instrument|two instruments|independent instrument|explains away|diagnostic.*confirm`, and read `findings/instrument/`, `findings/check/` and `findings/instrument-population/` by name; nothing holds it.
