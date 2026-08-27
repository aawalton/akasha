---
id: 2884d362-5af8-5925-898d-32de2753b83d
slug: no-path-for-a-project-not-started
page-type-slug: finding
title: "No path for a project not started"
domain-slug: domain/global
---

# Claim

Nothing now says a lead may decline to dispatch a defined project, or where a not-started one sits. The only statement of it was cut as actionless, and the two not-starting statuses are both reserved to Alan.

# Evidence

Commit `094aaa9a` on 2026-08-06 cut the **Start** child from `domains/tasks/lead/dispatch-project.md`. Two grounds, both sound: it named no action, where `tools/document/schemas/task.ts` asks each child for one; and its disposition is bound by `domains/role.md` Stopping, which governs this path.

What went with it was the only place saying a lead may decline to dispatch a defined project and record the reason on it.

`domains/tasks/lead/define-project.md:38` reserves both not-starting statuses: "Two calls stay Alan's: closing a substantive project he asked for, which kills his intent rather than restructuring yours, and parking one at `someday_maybe`, which is his to ask for."

So a lead who does not dispatch a defined project has nowhere to put it and nothing describing the act. A search of `domains/tasks/lead/*.md` and `domains/roles/lead.md` finds no other statement.

Two placements, and no criterion picks: the path belongs beside **Establish** on `define-project.md`, where the still-wants-doing question and the Alan-reserved calls already live; or it belongs nowhere, and a defined project is always dispatched.

Raised by the `review-instructions` reading of `domains/tasks/lead/dispatch-project.md` on 2026-08-06, against its own cut. That reading landed five commits and took the file from 25 lines to 22, among them a Ubiquitous Naming repair replacing "undivided" with "singleton" — the corpus's word, carried by `domains/project-track.md`, by four task documents named `build-singleton-*` and `build-parent-*`, and by `domains/roles/developer.md`. "undivided" appeared twice, both in that one file, and now appears nowhere outside quarantine.
