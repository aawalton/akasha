---
id: 7442fd1f-6cf4-5513-910b-ee8dddcd583f
page-type-slug: finding
title: "Vision guidance off the path"
domain-slug: page-type/domain
---

# Claim

The guidance for writing a domain vision stands only on a task about reviewing one, and nothing routes a seat writing a vision on a new domain surface to it.

# Evidence

Measured 2026-08-05, after Alan judged a vision I had drafted for `folders/agent-fleet.md` to be bad on form rather than on content.

The guidance exists and is thin. `tasks/lead/review-domain-vision.md` stage 3 carries three bullets, of which one is about drift: write it onto the domain's own document; state an end concrete enough to disagree with, in the present tense, as a state the estate is in; edit a drifted vision rather than appending. `tools/document/schemas/domain.ts:166` carries the other half in a code comment — "what the domain should become, concrete enough to disagree with… the fixed end an initiative's gaps are measured against" — on a surface no seat loads at boot.

Neither is reached from where a vision is written. `domains/domain.md` owns the concept, carries a Vision of its own, and says nothing about writing one; it has no `# Tasks` section. The schema admits a `# Vision` on every domain document — 189 surfaces declare a `domain-slug:` — while the writing guidance sits on a task named for reviewing an existing vision, reachable from `roles/lead.md` and from nowhere else.

So the two entry points diverge. A seat running `review-domain-vision` meets the guidance because the task is the route. A seat writing a new domain, folder, role, task or persona surface reaches the Vision section through the schema, which admits it silently and says nothing, and the guidance is a document that seat has no reason to open.

The instance: I hold `roles/lead.md`, which names the task, and I drafted a vision without opening it while running `change-instructions`. Every clause I wrote was an argument for a position rather than a state the estate is in, which is what the task's second bullet forbids. Alan's reading was that the estate lacks good guidance here; mine is that what exists is not on the path.
