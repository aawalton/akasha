---
id: c17b01cf-eed7-5633-8788-38f3bf8b6a82
page-type-slug: finding
title: "Stage 4 population unlisted"
domain-slug: task/ship-install
---

# Claim

Stage 4 of `ship-install` acts on a population stage 1 never listed. Stage 1 lists projects "whose criteria were left unticked for something only a real device shows". Stage 4 runs every verification "held back for a real device or for a file the build regenerates". The second category appears only at stage 4, so a seat that did what stage 1 said arrives without having found them. Either stage 1 should list both or stage 4 should drop the second.

# Evidence

Raised by the review-instructions seat on `domains/tasks/ios-install/ship-install.md`, which landed four commits and left this one: no line reaches it, and which way it resolves rests on whether the regenerated-file case happens.

Verified myself in the live document: L18 carries the first wording and L31 the second, exactly as quoted.

Not measured: whether any verification has in fact been held back for a file the build regenerates, which is the fact that settles it — and which of the two stages is the one in the wrong follows from that.
