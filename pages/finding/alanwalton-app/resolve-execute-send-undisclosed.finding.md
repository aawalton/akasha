---
id: fb1f5150-1eab-5075-ae31-94ffa48aed72
slug: resolve-execute-send-undisclosed
page-type-slug: finding
title: "Resolve execute send undisclosed"
domain-slug: domain/alanwalton-app
---

# Claim

The help for `ops email resolve --execute` says it performs "LIVE archive / unsubscribe-archive actions" and nothing more. It does not say that the `unsubscribe-archive` arm can send an email from Alan's own mailbox to an address a stranger published, and this is the verb that fires that arm in bulk across an inbox rather than one message at a time.

# Evidence

In `packages/alanwalton/email/google/src/email/resolve.ts` the flag's whole disclosure is `{ name: "--execute", description: "Perform LIVE archive / unsubscribe-archive actions" }`, and the command description adds only that the two are performed and that `surface` / `ignore` / `forward` / `agent-handle` are not.

The send is two hops from there. `executeAction`'s `unsubscribe-archive` arm calls `executeUnsubscribe` in `../unsubscribe`, whose second branch — taken whenever the sender published no RFC 8058 one-click token but did publish a `mailto:` URI in `List-Unsubscribe` — calls `sendMessage(client, { to: [parsed.mailto.address], subject: parsed.mailto.subject ?? "unsubscribe", body: "unsubscribe" })`. That is outbound mail from the authenticated account, with the subject line taken from the sender's own header, and no send verb is reached to make it visible.

The sibling verb discloses it. `ops email unsubscribe`'s help says it "fires the one-click POST or mailto fallback", and it also offers `--dry-run`, which prints the parsed intent and acts on nothing. `resolve --execute` has no `--dry-run` equivalent for the send: running without `--execute` reports the decision but never the unsubscribe intent, so there is no way to see which messages would mail out before mailing them. The blast radius differs too — `unsubscribe` takes one `--message`, while `resolve --execute` walks up to `--max` inbox messages (default 50).

Read at `~/code` on 2026-08-07 while ingesting `dirty/knowledge/email-verb-surface.md`. That document recorded the mechanism and did not record it as a disclosure gap.
