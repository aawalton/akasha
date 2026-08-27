---
id: 11cabbcd-f318-5b1c-9c24-b4bd4d5199ac
slug: path-globs-unresolved
page-type-slug: finding
title: "Path globs unresolved"
domain-slug: page-type/domain
---

# Claim

No instrument validates that a domain's path glob matches anything. A glob whose tree is renamed or removed goes on being declared, `governs` silently returns one domain fewer, and an empty result is indistinguishable from a path nobody governs.

# Evidence

Measured 2026-08-07, first-hand, in `~/instructions` and `~/code`.

The five keys are `instructions-path:`, `code-path:`, `memory-path:`, `books-path:` and `stories-path:`, declared at `tools/document/schemas/domain.ts:139-143`.

What validates one: `page/document/value.ts:39` reads `case "glob": return text.length > 0 ? null : no("an empty glob")`. That is the whole of it. The type carries the repo it is drawn over, so the root to resolve against is known there and is not consulted. `tools/document/schemas/folder.ts:5` narrows the same keys for folder documents to `/^(\*\*|[^*]+\/\*\*)$/`, which constrains the shape and still asks nothing about what it matches.

`rg -ln --multiline --multiline-dotall 'instructions-path|code-path|memory-path|books-path|stories-path' tools/checks/ tools/gates/` returns one file, `tools/gates/repo-agrees.ts`, which decides which repo a path belongs to rather than whether a glob matches. None of the nineteen checks under `tools/checks/` reads any of the five.

`tools/hooks/block-ungoverned-writes.ts` is wired to these same keys, so a glob that stops matching stops obliging anyone to read the domain declaring it.

WHAT I DID NOT MEASURE. No glob in the estate has rotted today: I resolved every one declared under `domains/` with `git ls-files -- ':(glob)<pattern>'` and each returned files, the smallest being `packages/infra/talos/src/nodes*.ts` at 3 and `packages/infra/seaweedfs/**` at 16. A blind spot rather than an active fault, invisible because every gate is green and would stay green through the rot.

My first pass at that sweep used a frontmatter parser of my own that mishandled the YAML list form and called five globs empty. All five were parse artifacts; the figures above come from resolving the patterns directly.

I did not test whether a glob matches only ignored or generated output, which would be a declaration reaching nothing a reader wants.
