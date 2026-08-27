---
id: 1a24fd28-28dd-5d91-8625-0efccdb3b8a6
page-type-slug: finding
title: "Read record buckets split"
domain-slug: domain/global
---

# Claim

`tools/read.ts` and the gates can disagree about the same read record. A delegate is told a file is unchanged since it read it, and `read-what-governs` in the same minutes reports that file not read at all.

`tools/lib/read-log.ts:104` states the payload's `agent_id` is stable for the whole of a subagent's life. Several seat ids under `/home/walton/.instruction-reads/` carry more than one subagent bucket from one night.

# Evidence

Three delegates hit this independently in one night, none having seen another's report.

The sharpest account: `bun tools/read.ts` reported files as already read at old timestamps while that delegate's own bucket held nothing, and `read-what-governs` then failed with `4 document(s) govern this path; 0 read, 4 not` on documents it had genuinely read minutes earlier. Its bucket was `/home/walton/.instruction-reads/019ff7d3-64eb-7461-915f-86e3404857d6--a22e5ed6dd1ceae00.json`, and four sibling buckets under that same seat id were accumulating in the same minutes.

The other two: a dry-run write passed `read-what-governs` over four documents and the identical real write moments later was refused as owing all four; and a first attempt to land was refused naming four documents read minutes before. Both re-read and got byte-identical content, so the record moved rather than the files.

`/home/walton/.instruction-reads/` holds buckets named `<seat-id>.json` and `<seat-id>--<subagent-id>.json`. Several seat ids carry three subagent buckets from tonight.

Each occurrence cost a read cycle and no wrong write, so the gate failed safe all three times. It is worth attention because the same disagreement pointed the other way — the record standing while the body never reached the agent — admits a write on a claim that is false, and nothing downstream would catch it.
