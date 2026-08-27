---
id: 66546ebf-427f-5413-8db0-16c7e95ddd86
page-type-slug: finding
title: "Answer delivers to wrong seat"
domain-slug: page-type/question
---

# Claim

Live-store verification confirms and sharpens the `ask-alan` answer-reaches-nobody defect (`findings/agent-harness/question-answer-reaches-nobody.md`): the free-text delivery path does not fail to send an answer, it sends to the wrong seat (the persona's other agent, not `sourceContext`'s asker), while the option-tap path still delivers to no agent at all.

# Evidence

Project #17572, domain `question`. Cut 2026-08-03 from a live-demonstrated defect at Alan's request; never defined, moved from the retired `notes` attribute 2026-08-15. Points to `findings/agent-harness/question-answer-reaches-nobody.md`.

Demonstrated: seq 386 (`019fc7a0-6ca3`), asked by `athena` (`mode: headless`), answered by tapping option 0, reads `answered`/`answeredOptionIndex: 0`; `sourceContext` holds the asker's id but nothing was enqueued (last inbound an hour prior). The seat learned only because Alan typed into its own conversation; a headless seat unattended has none, so escalation parks permanently.

Mechanism: `askedBy` is the persona page (`attention-question.ts:149`), `sourceContext` the asker (`:151`); the seam never selects it (`resolve-question.server.ts:262`). Three writers flip to `answered`, two message nobody: tap returns before `deliver` (`:285`); the only reactor gates on `sourceContext === "tracking-hourly-confirm"` (`hourly-confirm-subscriber.ts:189`); attention scan (`:228-236`) imports no messaging; free text delivers to `resolveAgentTarget(personaSlug)`, not `sourceContext`.

Re-verified live 2026-08-03T12:49:33.359Z via `ops db psql`: seq 386 asked 12:36:47Z, answered 12:37:29Z (not 12:22Z as stated, immaterial); seq 379 (`019fc29c-5084`) asked 2026-08-02 13:14:11Z, answered 13:15:16Z, free-text; both `askedBy` = Athena persona page seq 33. Sharper: seq 379's message WAS enqueued (13:15:16.583979Z, verbatim) to `019f9d68` (athena), while `sourceContext`'s asker was `019fbe77` (athena-lead) - wrong seat, not undelivered. Seq 386: no message exists anywhere in the window; asker's inbox last inbound 11:38:22Z.

Population count begun (matched by exact content, excluding 11 `tracking-hourly-confirm` and rows lacking a real `sourceContext` page): 170 agent-asked questions - cut before the result.

Unsettled: remedy scope; whether persona-routing is a second defect; what's owed a dead seat; whether park-on-question doctrine changes.
