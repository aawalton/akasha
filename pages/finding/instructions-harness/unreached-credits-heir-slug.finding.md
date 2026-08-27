---
id: 5d5ee1da-99f8-5456-8c81-e7ebc1a4a1c8
slug: unreached-credits-heir-slug
page-type-slug: finding
title: "Unreached credits heir slug"
domain-slug: domain/global
---

# Claim

`bun tools/unreached.ts` reports a quarantined document as cited when the only thing naming its slug is the live document built to replace it. A rebuild keeping the subject's slug inherits every slug hit the original would have scored, the heir's own front matter sufficing, so *cited* and *cited only by my own heir* print the same line. The verb states the false-negative direction of its narrowness and never this one.

# Evidence

Measured 2026-08-07 against `~/instructions` at `e6427c17c`.

One collision stands in the tree, and it is the whole of what this needs. Comparing the file-name stems of every tracked `dirty/**/*.md` against every tracked `domains/**/*.md` gives two shared: `claude`, one word and so searched nowhere, and `code-repo`. `dirty/questions/code-repo.md` is the quarantined original; `domains/folders/code-repo.md` is the live folder document that replaced it.

Both those files and the whole `domains/` root are gone. The live population is `pages/**/*.md` now, and the same stem comparison against it shares 1158 compound stems, measured 2026-08-27 — `dirty/the-wandering-inn/story-skill/wide-sweep.md` against `pages/skill/the-wandering-inn/wide-sweep.skill.md` is one of them.

Nothing live cites the original. `git grep -n -- 'dirty/questions/code-repo' -- domains/ tools/ notices/ settings/` exits 1 with no output, so no link and no literal path reaches it.

The verb reports it reached anyway. With `CODE_ROOT` pointed at a throwaway three-file repo naming nothing like it, `bun tools/unreached.ts --reached` printed `dirty/questions/code-repo.md`. Nine live documents contain the compound word `code-repo`: eight sibling folder documents mentioning the code repo in prose, and `domains/folders/code-repo.md` itself, whose single occurrence is its own `domain-slug: code-repo` line. The heir credits the original by declaring its own identity.

What it costs is that the `--reached` side is what a retirement is withheld on, so an original is shielded from the sweep by the fact of having been superseded. `--reached` prints paths and no citers, so nothing in the output distinguishes this from a real citation.

In `tools/unreached.ts`, `subjectsIn` takes each quarantined document's stem as its slug where the stem is compound, `main` puts it in `bySlug`, and `citedBy` credits the subject for any matching compound word in a live body. Nothing asks whether a live document at another path already owns that word.
