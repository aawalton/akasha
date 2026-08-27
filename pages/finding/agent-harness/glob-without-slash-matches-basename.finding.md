---
id: f28fa091-5263-5892-ab0e-872304e0bf55
page-type-slug: finding
title: "Glob without slash matches basename"
domain-slug: domain/agent-harness
---

# Claim

An `rg -g` pattern with no slash matches the BASENAME, so a glob written to find a file under a named directory silently searches for a file NAMED that. `-g '*lead*'` does not reach `skills/lead/SKILL.md`. The result is a true zero under a false conclusion, and it survives `-uuu`, which fixes a different bound.

# Evidence

Measured 2026-08-07 in a scratch tree under my own seat directory, three files:

    skills/lead/SKILL.md
    skills/manage/SKILL.md
    notes-lead-thing.md

    rg -uuu --files -g '*lead*' .     -> ./notes-lead-thing.md
    rg -uuu --files -g '*lead*/*' .   -> (nothing)
    rg -uuu --files -g '**/lead/**' . -> ./skills/lead/SKILL.md
    find . -type f                    -> all three

FOUND BY MAKING THE MISTAKE, not by looking for it. Ingesting `dirty/skills/agent-harness/rulings/rows.md`, I needed to know whether `lead/SKILL.md` still existed. I ran `rg -uuu --files -g '*lead*' dirty/`, got one plainly unrelated hit, and wrote into my report and into commit `66227fefb` that the file does not exist. Two lines later I listed `dirty/skills/` for an unrelated reason and found `lead/` and `manage/` standing. They are empty directories, so the conclusion happened to hold — but the search that produced it could not have falsified it.

WHAT THIS ADDS over the two standing findings. `agent-harness/search-tool-bound-unstated` is the `rg` shim excluding gitignored and hidden files — a different mechanism, and `-uuu` cures it while leaving this untouched, which is what makes this one worse: the seat that has learned the first lesson reaches for `-uuu` and still gets the wrong answer. `instrument/instrument-authoritative-for-one-question` is the general principle this is an instance of ("a grep answers your corpus, not the estate") and names no mechanism.

The estate leans on absence claims: an ingest cuts a line when nothing carries it, and a review reports a gap when nothing covers it. Both are searches returning nothing.

NOT MEASURED: how many standing findings or commit messages rest on a no-slash `-g` pattern. I did not sweep for it.
