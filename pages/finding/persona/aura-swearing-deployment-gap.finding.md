---
id: c237dd6c-f152-57fb-9684-7aabdac742d5
slug: aura-swearing-deployment-gap
page-type-slug: finding
title: "Aura swearing deployment gap"
domain-slug: page-type/persona
---

# Claim

Aura's swearing register tests strong in isolation but produces zero observed swearing in real use, so the unexplained gap sits in the deployment context (full Claude Code system prompt, persona-chat wrapper, conversation dynamics, or a different effective surface) rather than in the register content itself, and this has not been localized.

# Evidence

Project #15579 (domain: persona), status someday_maybe, live-on: deploy. Carried no `# Objective`; the notes below are the observation.

Follow-up to #15557 (harness landed, hypothesis confirmed). Key finding: Aura's CURRENT register already yields 75-92% strong-tier swearing in ISOLATION (fable, n=24/variant), yet Alan observes zero swearing in real use — so the bottleneck is the DEPLOYMENT context (full Claude Code system prompt, persona-chat wrapper, conversation dynamics, or a different effective surface), NOT register content.

Work the project proposed (not yet done): extend/point `ops persona swearing-eval` at the ACTUAL persona-chat deployment path vs isolated register; localize which layer suppresses the swearing; then decide on register refinement. The confirmed "demonstrate" block (full text in #15557's verdict note) is named as the register-side winner at 96%, to be refined into Aura's voice by sophia only if a register change is still warranted after the context gap is found.

Data baseline: ~/aura-swearing-fable-*.json.

Parked someday_maybe per inbox-zero sweep on 2026-07-17T04:24:11.212Z (decide-by-default, Backlog Management): the crafting bench holds one build at a time — #15610 (Olwen) occupied the seat, with #15558 (Ryn seat redesign) next-up. The stated un-park trigger was "#15610 finished AND #15558 moving — re-rank then." Scope at parking time was unchanged: harness the real persona-chat deployment path for the swearing gap, as a follow-up to #15557.
