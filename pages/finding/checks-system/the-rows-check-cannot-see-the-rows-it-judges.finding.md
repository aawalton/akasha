---
id: 01a046d1-9ec4-7d95-ab7f-770c570d8773
page-type-slug: finding
slug: the-rows-check-cannot-see-the-rows-it-judges
title: "The rows-sidecar check is correct and cannot reach nine tenths of the rows it exists to judge"
domain-slug: domain/checks-system
---

# Claim

`rows-sidecar-held-to-no-type` judges whether a rows sidecar stands beside a page whose type declares the property it is named for. It cannot see any `.uncommitted.jsonl` sidecar, because `.gitignore:2` ignores that pattern and the check's population is the tracked tree. Those sidecars hold 90.4% of all rows in the repository.

The check is not wrong. It is blind to most of its own subject, and its passing verdict says nothing about the part it cannot open.

# Evidence

The check's logic is at `checks-system/check/page-holds-to-its-type/rows.ts:50-51`, which is exactly the test that would catch an orphan:

    const beside = claimant(`${page}.md`, types).type
    if (beside === null) return unheld(relPath, key, `no page any page type claims stands at \`${page}.md\``)

`.gitignore` lines 1-3 are what puts its subjects out of reach:

    *.uncommitted.yaml
    *.uncommitted.jsonl
    *.uncommitted.attachment.*

The proportion is measured, not estimated: 90.4% of the 4,281,958 rows across 11,563 sidecars in akasha are in `.uncommitted` files. The check reaches the other tenth.

That the blindness is real and not theoretical is settled by five orphaned sidecars found by hand, holding 56,322 rows between them, which stand beside no page any page type claims. They are precisely what `rows.ts:50-51` returns `unheld` for, and the check has never returned that verdict for them because it has never opened them. Those five turned out to be harmless residue — one supervisor incarnation's whole 28-minute life, from the pre-segment naming era of a deleted repository, with no recurrence — so nothing was lost this time. Whether anything is lost the next time is not something this check can answer.

Not established: whether the check should read ignored files. The population being the tracked tree is a deliberate and defensible choice — a check that judged untracked files would fail on every seat's in-flight work. The question is a decision about what the check is for, not a defect in how it does what it does.

Not established: whether a different instrument should cover uncommitted sidecars instead, run at write time rather than as a gate over a diff. A sidecar becomes an orphan when it is written, not when it is committed, so the write path is where the fact exists to be caught; by the time a gate could see the file it has usually been committed or swept.

Not established: how many orphans stand in the ignored population today. Five were found by a hand sweep over 11,563 files. Nothing runs that sweep, so the number is a reading taken once rather than a monitored quantity.
