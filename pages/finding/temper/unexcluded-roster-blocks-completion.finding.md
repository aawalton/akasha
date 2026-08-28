---
id: 30f35fc9-5a12-50d4-acd5-0c9e05a8c82f
slug: unexcluded-roster-blocks-completion
page-type-slug: finding
title: "Unexcluded roster blocks completion"
domain-slug: domain/temper
---

# Claim

`checkAllCharactersCompletion` writes the account-wide "this task is done" completion only when every character in the full account roster holds a fresh per-character completion, with no exclusion path, so a single roster member that can never complete a task — a bank mule never intended to be played, or a character ineligible for a class/racial card — blocks that task's account-wide completion forever; this is left deliberately unfixed because it errs conservative.

# Evidence

Filed as project #15983 (domain temper), forked from #15972: #15972 deleted the flattering path (a roster sum renormalising onto the played subset); this row is the pessimistic mirror, parked with a warrant.

Mechanism: `task-auto-complete.ts:checkAllCharactersCompletion` writes the bare `taskId` account-wide completion only when every id in `sv.characters` (the full roster, `tracking/characters.ts:saveCharacterList`) holds a fresh per-character completion — no exclusion path. A single roster member who can never complete a task blocks it forever.

Two cases: (1) bank mule — Alan's call, not an agent's: whether to let users exclude characters from `all_characters` scope is a preference question, not a fact. (2) inapplicable card — fact-decidable but deliberately unfixed: a class/racial skill line is rankable only by that class/race; `checkAllCharactersCompletion` applies no applicability test — mirrors tier 1 of #15963's three-tier rule into the safe direction.

Why parked, per #15972: (a) errs conservative — nothing falsely claimed complete; (b) it was the gate keeping the flattering aggregate off web-visible state until #15972 landed — now discharged, safe to change on its own merits; (c) teaching the addon applicability duplicates reactor logic (`addon/src/ui/CLAUDE.md` forbids the addon recomputing cross-character state — ESO exposes only the current character).

Orientation, not a decision: both cases want one exclusion set on the rollup. Case 2's inputs (classId, raceId per character, `computeApplicableEsoSkillLineIds`) already exist at zero marginal cost. Case 1 needs a user-facing affordance and Alan's decision on what it means.

Sequencing: not urgent, errs safe. Worth doing when an `all_characters` task binds to a class/racial card (none today — live bindings: active-quests, daily-writs, dungeon-sets, skill-morphs) or Alan wants mule handling. Ask Alan first.
