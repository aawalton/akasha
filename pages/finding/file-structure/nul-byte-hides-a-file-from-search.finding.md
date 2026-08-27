---
id: cbdd2de7-11ac-466e-97e7-ea6b3947a4a5
page-type-slug: finding
title: "A NUL byte hides a file from search"
domain-slug: domain/file-structure
---

# Claim

A source file holding a raw NUL byte reads as binary to ripgrep, so a search matches nothing inside it and says nothing about having skipped it. The file is present, tracked, and readable, and every search over it answers as though its contents were not there.

# Evidence

Verified on 2026-08-24 in `/var/home/walton/repos/instructions`. Five tracked TypeScript files hold a raw NUL byte:

- `tools/lib/supervisor-file-version.ts`
- `tools/lib/graph/identity.ts`
- `tools/lib/graph/producers/web-app/web-app-entry.edge.producer.ts`
- `tools/lib/graph/producers/pipeline/workflow-modules.ts`
- `tools/lib/graph/producers/package/deploy-carries-package.edge.producer.ts`

The byte is deliberate rather than corruption. It separates the parts of a dedupe key, written as a `\0` escape inside a template literal, so the source spells an escape and the file on disk carries the byte.

Demonstrated, both directions. `rg -l rootingEdgeTypes tools/` returns three files. `rg -l --text rootingEdgeTypes tools/` returns four. The one only the second finds is `deploy-carries-package.edge.producer.ts`, which does hold the symbol. The first run reports no skip, no warning and no count of what it declined to open.

It cost an agent time on 2026-08-24: it was debugging that producer, searched for that symbol, and the search returned three files while omitting the one it was reading. A search that is silently a no-match search over part of its own population, in a system where an agent starts cold and what search misses does not exist to it.

Picking a replacement separator carries its own risk, because whatever stands in for the NUL must not appear in an id or an owner name.

Not measured: whether any other repository holds such a file, and whether a verdict already reached rests on a search that skipped one.
