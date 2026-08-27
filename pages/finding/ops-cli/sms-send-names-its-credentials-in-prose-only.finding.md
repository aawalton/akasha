---
id: e530e9ff-8ee5-5561-9d1b-93a524834b06
page-type-slug: finding
title: "Sms send names its credentials in prose only"
domain-slug: domain/ops-cli
---

# Claim

`ops sms send` requires `TELNYX_API_KEY` and `TELNYX_FROM_NUMBER` and declares no `envVars` in its help block, so `--help` prints no Environment section for a verb that cannot run without two credentials. Every other verb in the four namespaces moved tonight declares the ones it reads.

# Evidence

Read 2026-08-13 while moving the body. The help block carries `positionals`, `flags`, `exits` and `examples`, and no `envVars` key. The two variables are named twice in prose instead — once in the description, "Reads TELNYX_API_KEY and TELNYX_FROM_NUMBER from the environment (~/.secrets.env)", and once in the `exits` entry for code 1.

The body reads them outside the parser, which is why the declaration is not forced: it calls `requireEnv` from `@shared/utils-narrow/validate` directly rather than `parsed.requireEnv`, and wraps the throw to raise an input refusal naming the variable. Declaring them would also route them through the parser's own required-env check, which is a behaviour change and not only a help change.

The other seven verbs in `sms`, `email`, `notion` and `drive` declare theirs: `email auth login` and `drive auth login` each declare two `GOOGLE_GMAIL_OAUTH_*` vars as `required: true`, `drive fetch` declares three, and both `notion` verbs declare the two `SUPABASE_*` vars.

Not repaired: the task forbids changing a verb's declared surface while moving its body, on the ground that a repair made in the same act cannot be told from the move.
