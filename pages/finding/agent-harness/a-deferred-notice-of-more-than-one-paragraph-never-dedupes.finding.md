---
id: 080cfe9e-20da-5fcf-9061-9bca7a9ac276
slug: a-deferred-notice-of-more-than-one-paragraph-never-dedupes
page-type-slug: finding
title: "A deferred notice of more than one paragraph never dedupes"
domain-slug: domain/agent-harness
---

# Claim

The deferred restart notice dedupes only notices of a single paragraph, so a seat deferred repeatedly accumulates one copy of a multi-paragraph notice per deferral, and the notice it eventually reads is the same words several times over.

# Evidence

`mergeDeferredNotice` holds notices joined by a blank line and tests membership with `existing.split(NOTICE_SEPARATOR).includes(addition)`. The separator is that same blank line, so an `addition` containing one is never a single part and can never match a part. The guard fires for exactly the notices that do not need it.

Driven directly on 2026-08-13 against the implementation standing in `tools/lib/supervisor-iteration-outcome-db.ts`: merging `"Plain."` into itself answers `"Plain."`, and merging a two-paragraph notice into itself three times answers three copies.

Every notice this path carries is at risk, not an unusual one. `planRestartNotice` appends the recovery clause past the branch and joins it with a blank line, so a restart notice carrying that clause is two paragraphs by construction, and an operator's `interruptMessage` becomes the body on the same carrier. The reporting seat found a live agent row holding the maintenance restart notice three times over; that row has since been read and cleared, which is the corpus living rather than a contradiction.

The cost lands on the seat, and it lands at the worst moment. The rail exists so an idle seat is not woken for a cold-context turn merely to be told it was restarted, and what it finally reads on its next real inbound is the same paragraphs repeated — read by a model, in a context this mechanism was built to spend carefully.

Not repaired under the port that found it, deliberately and correctly. A port is held to answering what the file it replaces answers, so a seat that fixed this would have destroyed the equivalence its own arms exist to prove. It is also not repaired here yet; the copy measured above, `tools/lib/supervisor-iteration-outcome-db.ts`, is the one that stands today.
