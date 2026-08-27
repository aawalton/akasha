---
id: c4600194-4f2e-4aea-b221-b4fbdd09fb14
page-type-slug: initiative
slug: vera-graph-system
persona-slug: vera
domain-slug: domain/graph-system
parent-slug: aine-global
---

# Intent

- Every node type and edge type the graph carries is worth what it costs.
- No node the graph holds asserts something that is not true.
- No edge the graph draws asserts something that is not true.
- A producer can answer about one node without producing every node.
- Nothing the graph has already worked out is worked out again.
- No held answer outlives the shape it was written in.
- Whoever asks the graph gets an answer, not pieces to put together.

# Design

One graph is left in akasha. The old engine is deleted rather than translated, and what its remaining callers reach is a stub that refuses by name.

A type earns its place by answering a question something is asking now. Nothing is built for a case that is not here.

The intents are listed in the order they close. An edge's truth rests on both its ends, so a node asserting something false makes every edge touching it false as well. The last is worked only once every line above it is met, there being no point shaping answers over a set still moving.

Holding an answer and dropping a stale one are two halves of one thing, so they stand next to each other.

## How the work is shaped

The last four intents are one body of work rather than four. Targeting, holding answers, dropping stale ones and answering more than one hop are all the same index, and splitting them between seats yields four half-indexes.

Everything else runs in parallel, and as wide as there are seats to run it. A type is a piece of work one seat carries end to end, and types do not wait on each other.

## What Alan settled on 2026-08-27

He approves each type individually. The `Alan Approves` rule on `domain/the-graph` stands as written: no type enters the graph before he has approved that type.

The test for both halves:

- A node type is a different thing; an attribute is the same thing with a property.
- An edge type is a different way of connecting; an attribute is the same way with a property.

A thing is a node type where one file holds many of it; where a file holds one, it is that file with an attribute.

An edge is polymorphic in its ends wherever its way of connecting is. A folder holds a path whether a file or a folder stands there, so holding is one edge type reaching either. Nothing about the ends splits a type by itself.

Rootedness is removed as a concept. No edge type carries it and no node type seeds it. `ops graph rooted` and the `deployed` node flag go with it. Whether deleting a file breaks production is asked as a walk from a deployable rather than held as a flag.

## Code a page names

Code a page owns is an attachment of that page, on the pages system's existing convention rather than a shape of its own: the file sits beside its page, named for it with `.md` replaced by `.{key}.attachment.{extension}`. Renaming the code onto that pattern is mechanical.

Five page types own their code as an attachment: `command`, `check`, `graph-edge-producer`, `graph-node-producer`, and `agent-hook` with `inference-hook` inheriting it. The hooks' pages move to `tools/hooks/` to reach theirs; the rest already sit beside their code.

A path property is what names a file a page does not own, and these keep one:

- `graph-edge` and `domain` declare nothing at all. The single file beside a page of each is a shared module rather than an implementation, so the declaration's absence is what takes the false edge away.
- `page-type`'s `code-loaded-by` names a loader many pages point at.
- `readout-widget`'s `widget-path` names rings two pages share, so neither owns one.
- `cluster-check`'s `script` is retyped from `text` to `file`, and its pages stay where they are.
- The `old-*` types are skipped. Their code is being ablated, and a page that migrates lands beside its code as part of that.

## The set

Two node types, from the union's 52.

- `file` — every file, its format an attribute. Approved 2026-08-27.
- `folder` — every folder; being a package, and being deployed, are attributes. Approved 2026-08-27.

Three edge types, from the union's 83: `import`, `relation`, `contains`. All three are approved 2026-08-27.

`names` is dropped. It was drawn up to absorb seventeen old types, and most of those went with the node types they joined; what remained had no reader and was never built.

`file-kind` is not an edge. A file's format is an attribute on the file, by Alan's ruling on 2026-08-27, and an edge to the kind's page would state the same fact a second time. The `file-name` producer and the `file-kind` edge are gone; the name matching they used remains in `page/file-kind/`, being what tells the write path whether a body is bytes.

`path` collapses into `relation`, by Alan's ruling on 2026-08-27. Both are read by walking the property definitions and reading a frontmatter key, and with `file` and `folder` the only node types, a page is a file, so the ends do not differ either. Which key named the other end, and whether it resolved as a page or as a path, are attributes.

`code` collapses into `relation`, by Alan's ruling on 2026-08-27. It was the one inferred edge in the set: the `beside` producer read a page's stem and claimed the `.ts` file sharing it was that page's implementation. That claim is false where the stems merely collide, and it is false today, `readouts/ring/ring.domain.md` drawing a `code` edge to a module eight other files import. A page declares the code it owns instead, and the graph carries that as a relation like any other.

`relation` is a thin concept layer over the pages system's own index, by Alan's ruling on 2026-08-27. The reverse index at `.git/pages/index/relation/` already holds these edges with staleness marks, so the graph reads it rather than deriving the same facts a second time. The `frontmatter` producer, which re-derives them in memory, is replaced rather than kept.

`k8s-resource`, `pipeline-step`, `pipeline-workflow` and `depends` are dropped, with `uses`, `selects`, `declared-in`, `runs` and `precedes`. Nothing asks the graph for any of them today, and deploys are being rebuilt from the ground up, so a type written for them now would be written twice.

## Standing rulings

The code-editor repository is out of scope, by Alan's ruling on 2026-08-26. No code-editor node enters the graph.

A node names the repository it lives in, by Alan's ruling on 2026-08-26. A thing living in no repository is therefore not a node: an external package lives in a registry and a host lives on a network, and both are carried as attributes instead.

# Notes

91 files hold a stub where the old engine was: 56 in `infra/cluster-checks`, 32 in `tools/lib`, two audits and one test fixture. Each refuses by name when called. `infra/cluster-checks` does not typecheck and every `ops` command reaching it already fails, so it is kept for Alan and thea to ablation-migrate rather than for anything it does.

`tools/required-reading.ts` builds four maps in one loop — by repository and path, by file extension, by file-purpose ending, and by body-section heading — and each takes a plain `set`, so a second page claiming a key another page already holds silently replaces it. Two `readout-widget` pairs do, leaving one page of each pair unwarranted. A declaration that is displaced reads exactly like one never written, which is what makes it expensive to find.

`code-loaded-by` is written `type: string`, and no page-property-type page defines `string`. That is why it draws no relation edge and earns no required-reading warrant.

`tools/hooks/block-whole-suite-run.ts` and `tools/hooks/state-errand.ts` are registered in `settings/agents.json` with no page of any type.

`ops tests run tools` reports 16 failures and 2 errors, the same set before and after this initiative's landings.

The root typecheck reports 836 errors, nearly all `TS6307` and `TS5097` project-reference failures across `shared/*`. Neither `tools/lib/graph/` nor `infra/cluster-checks/` is in the root tsconfig references, so no error in either reaches that number.

The node line is nearly free today, the only node type being `file` and its nodes coming from what git tracks. It stops being free as further node types land, each claiming something a file's existence does not settle.

`edgesInto` answers a question about one node by producing every node in every repository and re-deriving each one's edges. It is what the targeting line is aimed at.

The `Said` memo at `build-context.ts` is the one held answer today, keyed by a file's git blob oid and a mark hashing the graph engine's own import closure, so it drops itself when an extractor changes.

`cache/closure/closure.ts` holds the only transitive walk in the repository, written by hand because the graph answers one hop. It is what the last intent is aimed at.

`domain/the-graph` writes its Condition and its `Alan Approves` rule in the word "kind", which no domain defines. `domain/graph-producer` says "node type" and "edge type" for the same thing. Whether "kind" gives way to "type" everywhere is open; the intents here are settled case by case.

`page-type/graph-edge` defines an edge as "one link from one node to another", while every page under it describes an edge type rather than a link.
