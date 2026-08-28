---
id: ef4a209e-8e5a-56ca-892d-aac11bc1cf20
slug: help-in-document-impossible
page-type-slug: finding
title: "No command document can supply help, so the line dividing reviewed commands from unreviewed is true of none"
domain-slug: page-type/ops-command
---

# Claim

The Design line on `page-types/ops-command.md` — "A command whose help stands in its own document has been through review; one falling back to its code file has not" — is true of no command. No command document can supply help: `tools/ops/documented.ts` reads only `path`, `instructions-path` and `kind` out of one and never its body, and no consumer of `CommandDocument` reads help. All 401 documents under `domains/commands/` fall back to their code file, and 392 are 20 lines or fewer.

# Evidence

Read off the `review-instructions` reading of `domains/commands/ops-seat-owed.md` finished 2026-08-21, which reached the line through `page-types/ops-command.md` governing its subject.

The line sits in Design, which `domains/domain-invariant.md` reserves for what holds now, and no reading of a command document can make it true: the mechanism it describes does not exist.

Not measured here: I did not open `documented.ts`, count the 401 documents, or search for a consumer of `CommandDocument` myself. Whether the line describes something intended and unbuilt, in which case it belongs in Intent, or something dropped, is not settled here.
