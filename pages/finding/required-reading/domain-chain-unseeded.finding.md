---
page-type-slug: finding
title: "Required reading seeds the domain chain only for a repository name nothing answers to"
domain-slug: domain/required-reading
slug: domain-chain-unseeded
---

# Claim

A page's required reading is seeded from the domains above it only when the repository argument
is the string `instructions`. No repository answers to that name since the absorption, and every
live caller passes `akasha`, so a domain page's required reading comes back as the repository page
alone — one document where the domain chain would have supplied twenty-two.

The same gate reads the other way for a source file. Under `instructions` the repository page is
never found either, because the lookup is keyed on the argument, and `pages/repo/` holds no
`instructions-repo` page. So neither value the argument can take produces the whole set: one arm
supplies the domain chain without the repository page, the other the repository page without the
domain chain.

The argument is doing two jobs at once. It names which tree to read, and it selects which seeding
rule applies — and the second job is what the word `instructions` was standing for.

# Evidence

Measured on 2026-08-27 against the akasha checkout at `/var/home/walton/repos/akasha`, by calling
`requiredReadingWhole` directly with each value the repository argument can take:

    pages/domain/file-structure.domain.md  -> instructions: 22   akasha: 1
    tools/audits/pages-named-as-stated.ts  -> instructions: 0    akasha: 1

The document dropped for the domain page is the whole chain above it; the single document both
akasha readings return is `pages/repo/akasha-repo.repo.md`.

`tools/required-reading.ts:202` returns early on `repo === "instructions" && isDirty(relPath)`, and
`:206` seeds `domainsAbove(relPath, docs)` and `requiredReadingClosure([relPath], docs)` under the
same `repo === "instructions"` test. `:207` then looks up `docs.domainAt(`${repo}-repo`)`, keyed on
the same argument.

`pages/repo/` holds two pages, `akasha-repo.repo.md` and `code-editor-repo.repo.md`. There is no
`instructions-repo` page, which is why the `instructions` arm finds no repository page.

The default on all three exported entry points — `requiredReadingFor` (:156), `requiredReadingWhole`
(:167) and `requiredReadingForEach` (:176) — is `repo: Repo = "instructions"`. The CLI at
`import.meta.main` (:235) instead passes `located.repo`, which `locatePath` resolves from the path,
so it is `akasha` for anything in this checkout.

`tools/code-comment/tree.ts:5` types the argument it supplies as `Tree = "instructions" | "code"`,
with no `akasha` member, and `tree.ts:21` passes that value straight through as the repository
argument to `requiredReadingForEach`. So the two callers disagree about what the argument names.

Not established: which of the two arms the gate is meant to apply to a page in this repository, or
whether the seeding rule and the tree selection were ever intended to be one argument.
