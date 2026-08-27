---
id: 990f0674-e563-5e15-9131-3d352f228183
slug: compose-input-tests-left-behind
page-type-slug: finding
title: "Compose input tests left behind"
domain-slug: domain/ops-cli
---

# Claim

`buildComposeInput` and `parseFromFlag` stand in akasha at `tools/lib/email-code.ts`, and no test
stands over them: the unit tests written for them guarded a second copy, and both went with the
code repository.

# Evidence

`ops email messages send` and `ops email drafts create` map their compose flags through
`buildComposeInput` in `tools/lib/email-help.ts`'s sibling `tools/lib/email-code.ts`, which carries
`parseFromFlag` and its quote-stripping helper with it. That is flag parsing, so it moved with the
bodies; `loadAttachmentFile` reads the filesystem and `parseSender` is a library, so both are
called where they stand.

The test that exercised `parseFromFlag` against the display forms stood in the code repository and
is gone. Nothing under `tools/tests/` names `email-code`, `buildComposeInput` or `parseFromFlag`,
and an unrestricted search of the tree finds one `parseFromFlag`, at `tools/lib/email-code.ts:46`,
next to `buildComposeInput` at line 60. The version an agent runs is guarded by nothing.

The two were compared at a commit in the deleted code repository over fourteen invocations — comma-splitting, padding,
empty `--cc` collapsing to undefined, the four `--from` display forms, lowercasing, a blank
`--from`, a trailing-text case, and one and two attachments — agreeing on every field and on key
order. That comparison was run once, by hand, and is not a test.
