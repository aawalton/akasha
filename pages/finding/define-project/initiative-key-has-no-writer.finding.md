---
id: 79bfdeb0-9a7e-532a-a98a-abae871ee99b
page-type-slug: finding
title: "Initiative key has no writer"
domain-slug: domain/global
---

# Claim

The `initiative:` key on a project has a schema, a reader and no named writer: `ops project create` does not write it, `domains/tasks/lead/define-project.md` never mentions it, and 231 of the 476 project documents standing in the memory repo declare none.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `domains/tasks/lead/define-project.md` dispatched from `review-documents`. The population count was re-run here: 476 documents under `projects/` in the memory repository, 245 carrying an `initiative:` key.

`tools/document/schemas/project.ts` declares the key and says the edge is "written once, by the document being created, at the moment it is decided". `ops project create` does not write it. `define-project.md` is the only task that writes that frontmatter and never names it.

`domains/tasks/lead/dispatch-project.md` calls it "the initiative the project was defined against", which points back at this task, while writing it nowhere.

`domains/tasks/lead/review-initiative.md` depends on it: "one serving an objective without declaring it is work nobody will credit." So 231 documents are exactly what that task describes as uncredited.

The reading did not add a bullet, on the ground that the cheaper repair may be an `ops project create --initiative` flag beside the existing `--domain`, closing the gap with no line added to any document — the direction `domains/instructions-harness.md` prefers, its Design reading "Anything a gate could refuse is not written as an instruction."

Not measured: how many of the 231 were opened against an initiative at all, whether the key was optional when they were written, or whether any initiative review has actually failed to credit work for this.
