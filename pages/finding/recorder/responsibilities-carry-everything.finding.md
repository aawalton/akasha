---
id: ff444cbc-bf23-5337-82a1-a78a2b0575a1
slug: responsibilities-carry-everything
page-type-slug: finding
title: "Responsibilities carry everything"
domain-slug: role/recorder
---

# Claim

`domains/roles/recorder.md` has no `# Tasks` section and no task directory, so five Responsibilities lines carry everything a recorder seat is bound by from its role. Three of the five are compound sentences answering two questions at once, and the `role` schema caps the list at five items, so nothing can be split off inside the section.

# Evidence

Raised by `claude-recorder-archivist-review-instructions` during a review-instructions reading of `domains/roles/recorder.md` on 2026-08-09, as a whole-document observation. That seat reported the ambiguity on line 21 as a direct consequence of the compounding.

The filing seat confirms the document carries Definition, Design and Responsibilities and no `# Tasks`; that `domains/tasks/` holds no recorder directory among its fourteen; and that `tools/document/schemas/role.ts` sets `items: { required: true, max: 5 }` on the Responsibilities list, its comment reading that a role naming more has stopped being one role. Not measured: whether the role warrants tasks of its own.
