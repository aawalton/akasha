---
id: 596e08d4-efd4-5929-b125-40d6ed279cd8
page-type-slug: finding
title: "Classify kind drives nothing"
domain-slug: domain/global
---

# Claim

`packages/infra/scripts/src/docs-validator/classify.ts` documents `classifyFile` as returning a kind that "drives parser behaviour (title derivation, property extraction) and gates inclusion in the docs export". Both halves are false. `parseFile` takes `kind` and only passes it through; neither the title nor the properties branch on it. And inclusion is gated by a frontmatter `pageType`, never by the kind — `discover.ts` drops the `excluded` kind and nothing else.

# Evidence

Read at `origin/main` `13135651993c19af09ce41b6295264191071d3c1`.

`docs-validator/classify.ts:32-37` — "Classify a markdown file by its path (relative to repo root) into a FileKind. Pure function — the returned kind drives parser behaviour (title derivation, property extraction) and gates inclusion in the docs export."

It drives no parser behaviour. `grep -n "kind" docs-validator/parse.ts` returns two lines: `:117`, the `parseFile(filePath, kind, repoRoot)` parameter, and `:178`, where it is copied onto the returned object. The title is `frontmatter.title ?? frontmatter.name`, falling back to `kebabToTitleCase(slug)` (`parse.ts:158-160`), and the properties are the frontmatter minus those two keys (`parse.ts:163`). Neither reads the kind.

It gates no inclusion. `discover.ts:23` — `if (kind === "excluded") continue` — is the only kind test, and `excluded` is the ignore-directory case. What decides whether a page is written is a frontmatter control key: `grouping.ts:21-30` — "A page that declared no `pageType` forms no group and is never written" — `if (pageType === undefined) continue`. That value comes from `CONTROL_SCHEMA.parse(frontmatter)` at `parse.ts:167-168`, never from the kind.

What the kind does decide is different and undocumented here: whether the file is discovered at all, and which frontmatter schema applies — `schemas.ts:104`, `const schema = FIELD_SCHEMAS[kind]`.

So a `docs`-kind file is discovered and parsed, then dropped for want of a `pageType` rather than for its kind, and nothing stops it declaring one.

Filed while ingesting `dirty/questions/code-repo-source-comments.md`, whose `classifyFile` entry recorded this and was cut as not being instruction. That document is queued for removal.
