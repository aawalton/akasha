---
id: 32aae94e-4b82-5824-9d7e-6e910a0787df
page-type-slug: finding
title: "Email help literals drift"
domain-slug: domain/ops-cli
---

# Claim

The Gmail environment block and the compose flag set are spelled in both repositories, and
nothing reports the two going apart.

# Evidence

`tools/lib/email-help.ts` declares `GMAIL_ENV_VARS` and `COMPOSE_FLAGS`, and
`packages/alanwalton/email/google/src/email/help-shared.ts` declares both under the same names.
Neither is a copy of the other in the sense that leaves an original: both are read, this one by the
eleven `email` verbs whose bodies stand here and that one by nothing once those verbs stopped
importing it.

They had to be spelled here rather than reached. Both are read INSIDE a `help` block, the
dispatcher imports a verb's file to render a usage screen, and `codeModule` is asynchronous — so a
reach at that position would open the code repository to print `--help`.

What a drift would do: `GMAIL_ENV_VARS` is named by all eleven verbs, so a fourth credential added
over there would leave every one of them rendering three and the parser asking for three. A flag
added to `COMPOSE_FLAGS` over there would be accepted by `ops email messages send` nowhere and
advertised nowhere, while `buildRawEmail` went on expecting it.

The two agreed field for field, in order, at commit 04f2c6e04 — compared by importing both and
deep-comparing rather than by eye. Nothing re-runs that comparison.
