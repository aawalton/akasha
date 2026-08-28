---
page-type-slug: finding
title: "The graph answers one hop"
domain-slug: domain/graph-system
---

# Claim

The graph answers one hop. `graph/ask.ts` offers `edgesFrom` and `edgesInto` and nothing that follows an edge further, so a reader wanting reachability writes the walk itself.

Five files read the graph. Around twenty write their own transitive walk over page relations instead, and they are not variations on one idea — they are independent implementations of the same three climbs. Eight separate walks up `extends-slug`, each with its own cycle guard and some with their own depth ceiling. Six separate walks up `domain-parent-slug`, one of them matching the key with a regex against a directory that does not exist. Two complete relation-resolution engines in the pages system, parallel to each other.

What that costs is not speed. It is that each reader carries the traversal's sharp edges alone: an entry no file is at answered as an empty closure, and of the two readers that could hit it, one guarded and one did not — so every check's cache mark was a constant for as long as nobody looked.

Alan ruled on 2026-08-27 that what the answer should look like is not yet clear, and dropped the intent aimed at it from both the domain and the initiative rather than leave it stated in terms nobody had settled.

# Evidence

Read 2026-08-27 in akasha at `88a38b07a`. `graph/ask.ts` exports `nodeAt`, `nodesIn`, `folderAt`, `foldersIn`, `edgesFrom` and `edgesInto`; none takes a depth or a kind of reachability.

Five tracked non-test files import it: `cache/closure/closure.ts`, `cache/said/said.ts`, `file-structure/folder/folder.ts`, `file-structure/section.ts`, and `ops-cli/file-structure/uses/uses.command.code.attachment.ts`.

`cache/closure/closure.ts` is the only transitive walk written against the graph: a twenty-line breadth-first search over `import` edges with its own worklist and `seen` set.

The count of hand-written chain walks comes from a reading of the corpus by a delegated agent, not from a script, so it is approximate. The three chains it named were spot-checked: `extends-slug` climbs in `page/property/frontmatter.ts`, `page/shape/chain.ts`, `page/name/naming/naming.ts`, `page/page-types.ts`, `pages-system/store/store.ts`, `tools/pages.ts`, `tools/lib/page-query-shape.ts` and `shared/pages-access/src/file-page-type-config.ts`; `domain-parent-slug` climbs in `tools/lib/domain.ts`, `agent/required-reading/required-reading.ts`, `page/required-reading/required-reading.ts`, `tools/dag.ts` and `monarch/review.ts`.

Not measured: whether any of those readers could be served by the graph as it is, or whether serving them needs edge types the graph does not have. That is the question Alan judged unsettled.
