---
id: a9bd8d03-5972-5739-9b88-14dbfe3b0011
slug: awaiting-alan-heading-refused
page-type-slug: finding
title: "Awaiting Alan heading refused"
domain-slug: barred-meaning/project
---

# Claim

`verify-handback` tells a lead to put the ask under an `Awaiting Alan` heading, and the project schema refuses that heading.

# Evidence

`tasks/lead/verify-handback.md` stage 3 reads: "The ask goes under an `Awaiting Alan` heading in the row document".

`tools/document/schemas/project.ts` declares exactly two sections — `Objective` and `Notes`. Writing `# Awaiting Alan` into project #17807 was refused: `[document-conforms] fail — line 50: a section — expected one the schema names, measured `# Awaiting Alan``.

`ops project ask --help` asks for something the schema does admit: "requires a line beginning `Awaiting Alan` (a heading is fine) with content under it". A bare line inside `# Notes`, with the ask in the paragraph beneath it, satisfies the verb and conforms. That is what #17807 now carries.

So the verb and the schema agree and the task instruction is the odd one out. Measured on 2026-08-04 while verifying #17807; two write attempts were spent on it before the shape was found.
