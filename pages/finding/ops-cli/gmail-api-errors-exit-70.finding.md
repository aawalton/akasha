---
id: 9052d83b-22a9-5813-b7f0-d6f35909b0e2
slug: gmail-api-errors-exit-70
page-type-slug: finding
title: "Gmail API errors exit 70"
domain-slug: domain/ops-cli
---

# Claim

Five `email` verbs surface a Gmail API rejection as exit 70, the code an unhandled defect
carries, rather than as a classified refusal.

# Evidence

`ops email messages trash`, `messages archive`, `messages modify-labels`, `attachments get` and
`unsubscribe` all end at exit 70 with `Invalid id value` on stderr when handed a message id Gmail
will not accept. The throw comes from the `@googleapis/gmail` SDK inside
`alanwalton/email-google/src/messages.ts`, which nothing catches, so
`exitCodeForThrowable` classifies it through none of its four arms and reports a caller's mistyped
id the way it reports a crash.

Measured on both sides of the body move at commit 04f2c6e04: the before side, dispatching to the
code repository's handler, and the after side, running the body from this repository, print the
same 17 bytes and end at the same code. The move preserved it deliberately rather than repairing
it — a refusal changed while a body moves cannot be told from the move.

`buildLabelModification` in the same file shows the alternative already in reach: it raises
`OperationalError` for a no-op mutation and `ops email messages modify-labels --message <id>` with
neither `--add` nor `--remove` ends at exit 3.
