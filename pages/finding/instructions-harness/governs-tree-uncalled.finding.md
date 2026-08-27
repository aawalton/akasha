---
id: 12101879-8ef9-5c70-99f5-624a26473ef0
page-type-slug: finding
title: "Governs tree uncalled"
domain-slug: domain/global
---

# Claim

`governsTree` in `tools/lib/governs.ts` is exported and called by nothing in either repository.

# Evidence

Searched for the name across the instructions tree and across `~/code/packages`. Every occurrence is inside `tools/lib/governs.ts` itself — the function, its doc comment, and nothing else. No test names it either.

It is about 1.1KB of a file standing at 14,745 bytes against the 15,000-byte ceiling, so what it costs is the displacement the next writer there has to arrange before adding anything.

Its own comment states the case for it: a rule claiming a whole tree binds an agent working there whether or not it touches a path, and nothing else answers that question. So this is either an affordance whose caller was removed or one whose caller never arrived, and which of those it is decides whether it goes.

Noticed while rewriting that file for row #17908, which added section-scoped governance and left this alone: whether the affordance should exist is a judgment that row did not own.
