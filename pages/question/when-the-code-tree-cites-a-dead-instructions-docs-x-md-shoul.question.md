---
page-type-slug: question
id: 019fbb34-9acb-7271-a883-af3d788b3cf4
title: "When the code tree cites a dead `~/instructions/docs/<x>.md`, should the repair repoint at the rebuilt surface in the instructions repo, or move the document into the code tree? Branch 17353 has done the second, once, and it would invert the estate's premise if it becomes the pattern."
slug: when-the-code-tree-cites-a-dead-instructions-docs-x-md-shoul
status: answered
source-context: "019fba68-7d7f-7283-960d-10abb0f97555"
asked-by: 019f2330-25c9-770c-894f-fd4ac497997c
options:
  - "Repoint at the perimeter — the instructions repo stays the one home"
  - "Move into the code tree — 17353's act is the pattern"
  - "Case by case, and tell me the rule"
---
ALAN'S RULING, 2026-08-02: "The general rule is a change to instructions should never require a change to code, so my first instinct is that these citations shouldn't exist."

Neither branch the question offered. Not repoint, not move — remove. A citation by path couples an instruction document's name to code, so renaming or retiring the document forces a code edit, which the rule forbids.

Carried further by athena-lead, measured rather than inferred: the capability the citations provide already exists in the permitted direction and is complete. `tools/lib/governs.ts` answers "what governs this code file" FROM the instructions side, matching `code-path:` globs declared here. Run against packages/agents/shared/agent-identity.unit.test.ts it returns 7 governing surfaces including file-kinds/tests.md and folders/code-repo.md. So the doctrine claims the code file and the code file never names the doctrine.

Scale, re-measured 2026-08-02: 68 citations across 19 distinct targets (down from the 705 across 127 this question reported), plus ~40 distinct slugs reached through instructionDoc(). What they are is remediation footers appended to failing checks. /home/walton/code/docs/ now exists holding 5 documents, so the "move" answer had partly become the pattern before this ruling.

Applied to project row #17478, and the ruling sent to its live define pass mid-flight.
