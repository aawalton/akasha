---
id: 472f4488-29c0-584d-a2a0-546d08c83393
slug: retirement-has-no-instrument
page-type-slug: finding
title: "Retirement has no instrument"
domain-slug: domain/global
---

# Claim

Nothing checks that a retired domain's word stopped being written, so most retirements are promises that quietly went unkept — and the harness itself now generates one of the retired words into every seat's context.

# Evidence

Twenty-three standing entries were checked on 2026-08-06 by locating each retired sense in the live corpus, `domains/` excluding `domains/retired/`, 231 files. Ten record a replacement that never happened: `pass`, `wake`, `walk`, `sweep`, `residue`, `levies`, `falsified`, `mints`, `red`, `quarantined`. `pass` is the widest, its retired sense standing 52 times across 12 files and remaining the corpus's ordinary word for one working session; `residue`, `levies` and `falsified` carry the retired sense at every live site they have.

`walk` is the sharpest. `tools/hooks/hold-contract.ts:135` emits `Contract walked: <path> at blob <version>` to the seat, so the harness generates a retired word at runtime and hands it to every agent moving a project. The seat that filed this received exactly that string while dispatching #18031 and copied it into the dispatch brief without noticing.

Three more entries name a replacement that is wrong rather than merely unmade. `axis` said the word was now written as a seat attribute, where `tools/lib/attributes.ts` declares `Attributes = { [K in Axis]?: Attribute }` — the axis is the key and the attribute is the value, so the substitution collapses a distinction the code depends on. `cut` claimed deleting a line would be written as delete, which is plain English and keeps the word. `door` named no replacement at all.

Doors have `check-doors-kept`, which reads `tools/doors-retired.txt` and fails when a tool stops being one. Retired domains have no equivalent: `domain-slug-unique` refuses a live domain reclaiming the slug, which stops the word being re-coined as a domain and permits every other use of it. So an entry's claim is true on the day it is written and nothing afterwards reads it again.

Two searches under-reported during this same inventory, which is why the population above is a floor. A `\b` anchor hid `verbless` from the `verb` sweep, and an exclusion glob of `!retired/**` silently failed to exclude `domains/retired/`, where `!**/retired/**` works.
