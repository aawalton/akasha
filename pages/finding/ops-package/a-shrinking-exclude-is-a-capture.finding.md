---
id: 7352aa9a-9c59-533e-b89a-8bcdf0dc8e84
slug: a-shrinking-exclude-is-a-capture
page-type-slug: finding
title: "A shrinking exclude and a shrinking include are the same set difference, and only the key they came from says which is a capture"
domain-slug: domain/ops-package
---

# Claim

A glob is judged by the files it matches, never by whether the pattern survived, and the difference must be taken both ways. A glob that loses files drops them from compilation and shows up as a type error somewhere. A glob that gains files is a package compiling a neighbour's sources, with errors attributed to the wrong owner and no path anywhere naming the mistake. An instrument that does not carry the key through reports a widened compilation as a loss, and is believed.

# Evidence

Measured 2026-08 over every tsconfig glob in the akasha migration plan: 540 judged, 538 matching exactly the same files before and after. Each was expanded against the tracked set as it is, expanded again from wherever its tsconfig lands against the set akasha would hold, and differenced both ways.

Moving packages from deep nesting to shallow widens base directories, so gaining is the likelier accident of the two.

`code/packages/infra/k8s` is the case that showed the key matters: its `**/*.test.ts` stops matching four files, which reads as a drop and is nothing at all, the pattern being an `exclude` over files its `include` of `src/**/*.ts` never reached.

The first pass reported twenty-three captures and every one was a fork — two copies of one package landing in one directory, each capturing the other's sources — so resolving the forks on paper collapsed twenty-three to one. That is a warning about any measurement taken against a tree that still holds both copies of a forked package.

The one true capture is `code/packages/shared/status-bar-access`, whose tsconfig includes `../../../../akasha/**/*.ts`: about 640 files today and 7,640 once akasha holds everything, one package compiling the whole repository, silently.
