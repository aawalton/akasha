---
id: 2170fb47-fcdb-51fc-ae29-e2e736df1b0b
page-type-slug: finding
title: "Sent label forgeability"
domain-slug: domain/alan-harness
---

# Claim

Whether Gmail's `SENT` label can be earned by a message a stranger put on the wire is unestablished, and that label is the whole of the test deciding who may reach a raw persona seat.

The one measurement taken imported a forged `From` through an authenticated call holding Alan's own credentials, which predicts the same result whether Gmail keyed on the header or credited the caller as the mailbox owner. Nothing inside the estate can originate the message that would separate them.

# Evidence

`decide` in `packages/alanwalton/email/resolver/src/decide.ts:67` carries a persona's handle only when `ResolverInput.isSent` — Gmail's `SENT` label — is set; every other message falls to `amy-handler`. Landed as `5a1cbed4`, on `origin/main` and live. It replaced a channel match that routed a stranger's mail to the raw persona seat unconditionally, which is how two third-party messages reached the `amy` lead seat on 2026-08-05.

Project #17894 measured the label by importing a message forging `From: aawalton@gmail.com` through `messages.import`, which Google documents as applying standard delivery scanning as if the message had been received over SMTP. Gmail stamped `["IMPORTANT","SENT"]` on it, and stamped nothing on the same import from a stranger's address. `SENT` cannot be written directly: `modify` refuses it with `Invalid label: SENT`.

That call is authenticated with Alan's own OAuth credentials, and an import into the owner's own mailbox carrying the owner's own address is credited as sent mail on either explanation. So the result is consistent both with Gmail keying on the `From` header, which a stranger sets freely, and with Gmail crediting the authenticated caller, which a stranger cannot be.

The estate cannot take the measurement that separates them: it has no SMTP relay, and 100 messages `in:anywhere` from Alan's address are all `SENT` or `DRAFT`, none delivered.

Nothing in `packages/alanwalton/email` reads any authentication verdict — no `Authentication-Results`, no DKIM, no SPF. The two signals in existence are `isSent` and `isFromSelf`, and `resolver/src/types.ts:71` already declares the latter unfit to decide who may reach a raw seat.

Not measured: whether an unauthenticated external sender forging that header earns the label; whether Gmail's inbound filters would classify such a message as spam before the label question arises; and whether a DKIM verdict is available on the `messageAdded` feed the watcher reads.
