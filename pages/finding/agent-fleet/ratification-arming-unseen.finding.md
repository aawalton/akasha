---
id: 871c148c-ea21-57aa-a14a-e7a10e24d20f
page-type-slug: finding
title: "Ratification arming unseen"
domain-slug: domain/agent-fleet
---

# Claim

The pure decider authorising a `ratified-interrupt` wake cannot see the data that decides whether the wake happens. `decideEmission` compares the envelope's stamped source against the handle the warrant names, both values in code. Whether that handle's live row still declares the tag is page-row data, one `page set-value` from flipping and outside any pure decider. An unarmed recipient leaves the refusal path green while the revival stops, and only the smoke contract observes it.

# Evidence

Read `packages/agents/shared/wake-warrant.ts` whole. The module states the bound itself, under a header it calls "WHAT IT DOES NOT COVER, stated here rather than discovered later": "the classifier reads the rules the CODE declares: a persona who arms an extra source as row data turns a delivery-class envelope into a wake with no code change, which this cannot see."

The seam that IS closed sits beside it. `decideEmission` refuses an envelope whose stamped source is ratified for a different handle, refusing with "granted to '<handle>' alone", and the `ratified-interrupt` member carries `recipientHandle` for exactly that pairing — `SOURCE_RECIPIENTS` stores the source and the recipient as one row. So stamped-vs-claimed is structural and claimed-vs-declared is not, and the two are one field apart.

The consequence is that a sender goes on claiming a revival it is not getting while the envelope reads as a legitimate ratified interrupt.

Not measured. I did not run the smoke contract, did not query any persona row, and did not count how many ratified pairings stand today or whether any is presently unarmed. Nothing here shows the gap is open on a particular recipient — only that the decider's inputs cannot close it. I also did not check whether any instrument outside the smoke contract reads the declared tag.

Filed rather than left where it was found. The observation stood in `dirty/docs/agent-message-canon.md`, which this seat removed on emptying it, commit `442da8c`; git holds the text. That record was queued for removal, so the observation would have gone with the sweep.
