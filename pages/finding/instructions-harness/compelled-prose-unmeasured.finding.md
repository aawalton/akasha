---
id: d4db38be-a8fc-596b-89f8-655366d3e7da
page-type-slug: finding
title: "Compelled prose unmeasured"
domain-slug: domain/global
---

# Claim

The prose an agent is compelled to read before it may write is not on the perimeter and has never been measured for how hard it is to read. `tools/**/*.ts` carries 562 KB of it in comments across 217 files: 20 KB in the schema files the write gate makes an agent read before admitting a change, and 72 KB in the gate and hook headers a refusal sends it to.

# Evidence

Measured 2026-08-05 while scoping the plain-language initiative, which Alan bounded to `.md` files in the instructions repository. That initiative closed on 2026-08-06 with all four objectives met. That line leaves this population out, and it is left out knowingly rather than overlooked.

The `read-the-schema` gate refuses a write until every schema claiming the path has been read whole, so schema prose binds harder than a perimeter surface does: a reader can skip a domain file and still act, and cannot skip these. `tools/document/schemas/domain.ts` runs to 255 lines, most of it comment, and its key definitions carry the reasoning a writer needs before naming a key.

The same holds for the door output a seat reads at the moment it is stopped. `ops project move-to --help` prints four paragraphs each over a thousand characters; the one sentence that answers which status a row may take next is inside the third.

None of this was in the 107-surface measurement behind the initiative's stated case, which counted markdown only. The estate's own mean of 23.3 words a sentence says nothing about it.
