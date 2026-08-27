---
id: e9d21346-6bbf-5ec8-8659-8a082dbddaa7
page-type-slug: finding
title: "Ask heading unwritable"
domain-slug: barred-meaning/project
---

# Claim

`ops project ask` requires an `Awaiting Alan` section that the project schema refuses as surplus, so the only route through both is a line buried inside `# Notes`, competing with the verdict for that section's cap.

# Evidence

Measured 2026-08-04 while carrying #17766's fourth objective to Alan.

`ops project ask --help` states it "requires a stated `Awaiting Alan` section there" and "requires a line beginning `Awaiting Alan` (a heading is fine) with content under it".

Appending `# Awaiting Alan` as a level-1 heading to project #17766 was refused at the door: `[document-conforms] fail — 1 part(s) outside the `project` schema`. `tools/document/schemas/project.ts` declares two sections — Objective and Notes — and admits no third.

So the heading the verb names cannot be written, and what remains is a bare line inside `# Notes`, which the verb does accept. That section is capped at 2000 characters and already carries the verdict a lead writes before moving the row, so the two share one bound: the ask this row needed was cut from about 1,100 characters to fit beside a verdict itself cut from 1,528.

The `awaiting_alan_verification` gate tests the row's `alanAsk` stamp, which this verb is the only writer of, so the collision stands between a lead and the one exit `verify-handback` names for something no instrument settles.

Not verified: whether any row anywhere carries an `Awaiting Alan` heading that predates the typed schema, and whether the verb's line-based reading was written to accommodate this or arrived independently.
