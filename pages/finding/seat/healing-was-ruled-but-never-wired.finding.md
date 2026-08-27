---
id: b4285109-182b-51c3-87e7-b97a86b3c5a2
slug: healing-was-ruled-but-never-wired
page-type-slug: finding
title: "Healing was ruled but never wired"
domain-slug: page-type/seat
---

# Claim

Alan's ruling of 2026-08-04, that a narrowing seat vocabulary must heal rather than gate, landed as a function and a unit test with no caller. `widenedBy` is wired to nothing; `ops seat project-seat` still builds corpus-only rules and still refuses; and three file headers describe the healing as being in force. So a task rename that strands any row is blocked today by the guard the ruling retired.

# Evidence

MEASURED 2026-08-06 in `~/code`, after `ops seat project-seat` refused the `create-persona-register` to `create-persona-voice` rename, naming 44 undeleted rows holding the old task value.

WHAT THE RULING BUILT. `packages/agents/shared/agent-coherence.ts:143` exports `widenedBy(rules, held)`, which takes each `valueIn` rule and admits its corpus plus whatever the population is measured to hold. It landed at `e0facf27f6`, "identity(#17772): a narrowing identity corpus heals rather than blocking".

IT HAS NO CALLER. `rg widenedBy` across the repo returns its own definition, two lines of prose above it, and `agent-coherence.unit.test.ts`. `packages/agents/cli/src/agent/project-seat.ts:293` — the only writer of the `agent` page-type's `coherenceRules` — calls `agentCoherenceRules(vocabularies)` instead, closing each axis against the corpus alone, and keeps the pre-flight at `:284` that refuses whenever an undeleted row stands outside it. That pre-flight is the hand-kept ordering the ruling replaced.

THREE HEADERS ASSERT THE BEHAVIOUR THE CODE DOES NOT HAVE. `agent-coherence.ts:35` says a drain "is no longer what stands between a shrunk corpus and a projection". `drain-identity-vocabulary.script.ts:12` says "that verb heals instead", and that the script "is no longer a precondition for anything". `project-seat.ts:33` says the opposite inside the same package: "RUNNING IT NARROWS A LIVE GUARD", "This verb REFUSES rather than writes". That drain header was edited as recently as `e499429f5e` today without the contradiction being noticed.

THE MEASUREMENT A FIX NEEDS IS ALREADY TAKEN. `rowsOutsideVocabulary` at `project-seat.ts:249` already collects every undeleted row across these five axes, and `strandedFindings` already groups the held values by axis — which is the `held` map `widenedBy` asks for. The scan producing the refusal is the scan that would produce the widening.
