---
id: c89282e5-2e52-5388-a725-377aa104533d
slug: telnyx-refusal-reason-discarded
page-type-slug: finding
title: "Telnyx refusal reason is discarded"
domain-slug: domain/ops-sms
---

# Claim

`ops sms send` throws away the body Telnyx returns with a refusal, so a failed send reports only a
status code and nothing says why it was refused.

# Evidence

`tools/commands/sms/send.ts` reads the response body into `bodyJson` and passes it to
`parseTelnyxSendResponse`, then checks `res.ok` FIRST and throws `telnyx send: HTTP ${res.status}`.
On a non-OK status the parsed reason is computed and never used. The `!parsedRes.ok` branch below
it, which does carry a reason, is reachable only on a 2xx.

Measured on 2026-08-18: a send to `+16085122511` from `+18445122550` failed with
`telnyx send: HTTP 400` and no further text. The sender is `active`, type `toll_free`, on an
`enabled` messaging profile whose `whitelisted_destinations` include `US`, so none of the
conditions a caller can check from outside explains the refusal. Telnyx returns an `errors` array
carrying a code, a title and a detail on a 400; that array was read and discarded.

Not measured: what the discarded body actually said, and whether the refusal was about the sender's
toll-free verification, the destination, or the message content. Reading it would have taken a
second send, which is why the reason is still unknown.
