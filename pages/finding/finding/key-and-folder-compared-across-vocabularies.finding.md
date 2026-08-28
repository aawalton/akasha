---
page-type-slug: finding
slug: key-and-folder-compared-across-vocabularies
title: "Findings-sorted compares a prefixed key against a bare folder"
domain-slug: finding
---

# Claim

`tools/audits/findings-sorted.ts` holds a finding's `domain-slug` against its folder segment as
two strings, but the corpus writes them in two different vocabularies: the key carries a page-type
prefix — `domain/file-structure` — while the folder is the bare slug — `file-structure`. The two
can therefore only agree where the key was written bare, which is 30 of the 3266 findings carrying
one. So the audit reports 29 findings sorted and fails over the rest, when almost none of them is
misfiled. An audit that fails on nearly its whole population reports nothing a reader can use: the
verdict is skipped, and the day a finding really is misfiled it stands as one line in three thousand.

# Evidence

Measured 2026-08-27 in `/var/home/walton/repos/akasha`.

THE COMPARISON. `tools/audits/findings-sorted.ts` takes the folder at line 36 and the key at line 38,
then at line 41 compares them as plain strings:

    const folder = segments[0] as string
    const owner = textField(parseFrontmatter(repo.read(relPath)), DOMAIN_KEY)
    if (owner === null) continue

    if (owner !== folder) {

BOTH SPELLINGS, FROM ONE FOLDER AND ITS NEIGHBOUR.
`pages/finding/finding/dead-domain-folder-passes.finding.md` declares `domain-slug: page-type/finding`
and sits in the folder `finding`, so `owner !== folder` and it is reported misfiled.
`pages/finding/agent-harness/absence-read-as-an-answer.finding.md` declares `domain-slug: agent-harness`
and sits in the folder `agent-harness`, so it passes. Neither is misfiled.

THE RUN. Driven over the tree as it stands — `git ls-files 'pages/finding/*'` as the document set,
`findingsSorted` called directly — the verdict is `fail`, the detail is
`29 finding(s) sorted under 17 domain folder(s)`, and the declared population is
`3286 finding(s) under 'pages/finding/'`.

THE CENSUS. Reading the first `domain-slug:` line out of every one of those 3286 files gives 3236
carrying a prefixed key and 30 carrying a bare one. So the failing set is not a set of misfiled
findings; it is the majority spelling, and the passing set is the minority.

THE COMMAND AGREES WITH THE AUDIT AND NOT WITH THE CORPUS. `ops finding create --help` says the
domain is stated once and "the key and the folder are both derived from it, so the two cannot
disagree — which is the state `tools/audits/findings-sorted.ts` exists to report". Its `--domain`
flag takes a bare slug and `composeFinding` in `tools/lib/finding.ts:92` writes that string into the
key verbatim while `findingPathIn` at line 25 uses the same string as the folder. So the sanctioned
route can only produce the bare form, and every page written the prefixed way is invisible to the
one audit meant to keep the two in step.

Not measured: which of the two spellings is the one the corpus should settle on, and whether any
page in the failing 3236 is genuinely in the wrong folder — the audit cannot answer that while it
fails on all of them.
