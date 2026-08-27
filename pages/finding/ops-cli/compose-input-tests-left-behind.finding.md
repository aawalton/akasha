---
id: 990f0674-e563-5e15-9131-3d352f228183
page-type-slug: finding
title: "Compose input tests left behind"
domain-slug: domain/ops-cli
---

# Claim

`buildComposeInput` and `parseFromFlag` now stand in the instructions repository, and the unit
tests written for them still stand over the copy in the code repository.

# Evidence

`ops email messages send` and `ops email drafts create` map their compose flags through
`buildComposeInput` in `tools/lib/email-help.ts`'s sibling `tools/lib/email-code.ts`, which carries
`parseFromFlag` and its quote-stripping helper with it. That is flag parsing, so it moved with the
bodies; `loadAttachmentFile` reads the filesystem and `parseSender` is a library, so both are
called where they stand.

`packages/alanwalton/email/google/src/email/help-shared.unit.test.ts` exercises `parseFromFlag`
against the display forms, and it now guards the copy no verb reaches. The version an agent runs
is guarded by nothing.

The two were compared at commit 04f2c6e04 over fourteen invocations — comma-splitting, padding,
empty `--cc` collapsing to undefined, the four `--from` display forms, lowercasing, a blank
`--from`, a trailing-text case, and one and two attachments — agreeing on every field and on key
order. That comparison was run once, by hand, and is not a test.
