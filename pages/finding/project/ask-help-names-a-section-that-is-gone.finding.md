---
id: 1d25912f-c302-534e-96e1-16bb2d10f61f
slug: ask-help-names-a-section-that-is-gone
page-type-slug: finding
title: "Ask help names a section that is gone"
domain-slug: barred-meaning/project
---

# Claim

`ops project ask --help` tells the reader the project schema admits `# Motivation`, which it no longer does, inside the sentence explaining why the ask must live in `# Notes`.

# Evidence

Read 2026-08-09, immediately after the section was dropped. `packages/alanwalton/projects/cli/src/project/ask.ts:38` carries, in the verb's own description: "the `project` schema admits `# Motivation`, `# Objective` and `# Notes` and nothing else, so a document with an `Awaiting Alan` section is refused at the memory door before this verb ever reads it."

The schema now declares two sections, Objective and Notes, at `tools/document/schemas/project.ts` in the instructions repo, landed as `c7cd48e`. The section was also stripped from every project document in the memory repo.

The conclusion the sentence draws is still right — an `Awaiting Alan` heading is still refused as surplus, so the ask still belongs in `# Notes`. What is wrong is the enumeration it rests on, and it is a reader's most likely source for what a project document may hold, since it states the set explicitly and no other help text does.

The repair is one line and cannot ride an instructions-repo commit: this file is in the code repo, so it needs a branch, CI and a deploy.

NOT A DEFECT, recorded so it is not re-derived: `project-document.unit.test.ts:99,151,158`, `move-to.unit.test.ts:380` and `awaiting-alan-ask.unit.test.ts:9` all carry `# Motivation` in sample documents. They exercise this package's own tolerant parser rather than the typed schema, and one of them already carries an `# Awaiting Alan` heading the schema refuses, so none of them asserts conformance and none is failing.
