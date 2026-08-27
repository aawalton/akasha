---
id: 28c40fad-a2d8-5924-a8e2-33c753d422ae
page-type-slug: finding
title: "Ask Alan answer reaches nobody"
domain-slug: page-type/question
---

# Claim

Question `019fc29c-5084-7870-a6fc-cea1277433b7` (seq 379), asked 2026-08-02T13:14:11Z by the headless `athena-lead` agent and answered by Alan at 13:15:16Z, never reached the asking agent — its mailbox held 46 inbound messages and none carried the answer — because `resolve-question.server.ts` never reads the `sourceContext` id `ask-alan` records, and two of the three writers that flip a question to `answered` send no message to anyone.

# Evidence

Project #17494, domain `question`. Created by `athena-lead` from `findings/question-answer-reaches-nobody.md`, filed 2026-08-02 after Alan noticed he had answered a question the asking agent never received.

**What happened.** Question `019fc29c-5084-7870-a6fc-cea1277433b7` (seq 379): asked 13:14:11Z by headless `athena-lead`, answered by Alan 13:15:16Z. Asking agent received nothing (46 inbound messages, none the answer). Found only because a manager on an unrelated row read the page 13:20:04Z; otherwise it would wait on an answer already given, and Alan asked again.

**Mechanism.** `ask-alan` writes `askedBy` (persona page, `attention-question.ts:149`) and `sourceContext` (asking agent, `:151`). The questions seam never selects `sourceContext` — reads only `["id","title","slug","askedBy","status","options"]` (`resolve-question.server.ts:262`). All 231 answered questions carry `sourceContext`, unread by anything. Three writers flip to `answered`; two message nobody: (1) verified option tap returns before `deliver` (`:285`), tested (`.tapped.unit.test.ts:60-62`); docblock (`:236`) assumes a reactor consumes the row, but the only one gates on `sourceContext === "tracking-hourly-confirm"` (`hourly-confirm-subscriber.ts:189`), which no `ask-alan` question satisfies; (2) attention scan (`:228-236`) imports no messaging, assumes Alan answered in the asker's own conversation; (3) free text delivers to `resolveAgentTarget(personaSlug)` (`:138-152`), the persona's handle, not `sourceContext`.

**Fix shape, undecided.** Route by `sourceContext`, persona handle as fallback; make silent paths deliver. Both assumed something true originally, false for `ask-alan`.

**Not established.** Which writer resolved this row. By elimination, the attention scan: no `answeredOptionIndex`, answer matches neither option; `athena` resolves to the asker itself; a `resolveAsker` failure would have blocked the flip. `ops page history` has no version for the page.

**Bar.** A question asked by a headless agent and answered by Alan reaches that agent; a replaced agent does not swallow it.
