---
id: c4600194-4f2e-4aea-b221-b4fbdd09fb14
page-type-slug: initiative
slug: vera-graph-system
persona-slug: vera
domain-slug: domain/graph-system
parent-slug: aine-global
---

# Intent

- Nothing the graph has already worked out is worked out again.
- No held answer outlives the shape it was written in.
- Whoever asks the graph gets an answer, not pieces to put together.

# Design

One graph is left in akasha. The old engine is deleted rather than translated, and what its remaining callers reach is a stub that refuses by name.

A type earns its place by answering a question something is asking now. Nothing is built for a case that is not here.

The intents are listed in the order they close. The last is worked only once every line above it is met, there being no point shaping answers over a set still moving.

Holding an answer and dropping a stale one are two halves of one thing, so they stand next to each other.

## How the work is shaped

What is left is one body of work rather than several, being all one index, and splitting it between seats yields half-indexes.

## What Alan settled on 2026-08-27

He approves each type individually. The `Alan Approves` rule on `domain/the-graph` stands as written: no type enters the graph before he has approved that type.

The test for both halves:

- A node type is a different thing; an attribute is the same thing with a property.
- An edge type is a different way of connecting; an attribute is the same way with a property.

A thing is a node type where one file holds many of it; where a file holds one, it is that file with an attribute.

An edge is polymorphic in its ends wherever its way of connecting is. A folder holds a path whether a file or a folder stands there, so holding is one edge type reaching either. Nothing about the ends splits a type by itself.

A node kind on a `graph-edge` page is a list, by Alan's ruling on 2026-08-27, an edge reaching either a file or a folder having no way to say so before. `import` and `relation` restate their ends as one-item lists.

No command reaches code through `codeModule`, by Alan's ruling on 2026-08-27. Where a page says a command is safe against any checkout, that is a permission and not a requirement to load from one.

The relation index names an attachment end, by Alan's ruling on 2026-08-27. It already names a path end under `relation/{property}/{repo}/{path}.jsonl`; an attachment is derived from the naming convention rather than declared, so nothing wrote an entry for one.

A body link is a relation key rather than an edge type of its own, by Alan's ruling on 2026-08-27. It is a pseudo-property: nothing declares it as a page property, and the key `link` is what carries the difference between a page's prose naming a path and a page's frontmatter declaring a claim. Reading `relation` edges unnarrowed therefore mixes the two, and no reader in production does.

Rootedness is removed as a concept. No edge type carries it and no node type seeds it. `ops graph rooted` and the `deployed` node flag go with it. Whether deleting a file breaks production is asked as a walk from a deployable rather than held as a flag.

## What Alan settled on 2026-08-28

An `import` edge runs from any file, by Alan's ruling on 2026-08-28. The type narrowed its from-node to `file-extension: ts` while 4,051 of its edges leave a `.tsx` file, and only a file that imports draws one at all.

`relation` is the edge from a page to one it names, by Alan's ruling on 2026-08-28. 2,926 of its 124,533 edges carry the key `link`, which a page names in its prose rather than in its frontmatter, and `relation-key` is what says which of the two it was.

The `typescript` producer is `import`, by Alan’s ruling on 2026-08-28. It is named for the edge it makes, as `relation` and `contains` are; `loader` makes `import` edges too and is named for the far end of its own.

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

All five types are built. `contains` is read off the path rather than derived: what holds a node is its key with the last segment cut, and what a folder holds is one indexed pass over that repository's tracked keys, kept against the context that asked. No `contains` edge is stored, and its far end carries no attribute saying whether a file or a folder stands there, the node already saying.

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

91 files hold a stub where the old engine was, each refusing by name: 56 in `infra/cluster-checks`, 32 in `tools/lib`, two audits and one test fixture. `infra/cluster-checks` does not typecheck and every `ops` command reaching it already fails, so it is kept for Alan and thea to ablation-migrate.

`tools/required-reading.ts` builds four maps — by repository and path, by file extension, by file-purpose ending, by body-section heading — each with a plain `set`, so a second page claiming a key another holds silently replaces it. Two `readout-widget` pairs do, leaving one page of each unwarranted. A displaced declaration reads exactly like one never written, which is what makes it expensive to find.

`code-loaded-by` is written `type: string`, and no page-property-type page defines `string`. That is why it draws no relation edge and earns no required-reading warrant.

`tools/hooks/block-whole-suite-run.ts` and `tools/hooks/state-errand.ts` are registered in `settings/agents.json` with no page of any type.

`ops tests run tools` reports 16 failures and 2 errors, the same set before and after this initiative's landings.

The root typecheck reports 836 errors, nearly all `TS6307` and `TS5097` project-reference failures across `shared/*`. Neither `tools/lib/graph/` nor `infra/cluster-checks/` is in the root tsconfig references, so no error in either reaches that number.

Every node in akasha was measured against disk on 2026-08-28: 89,439 `file` nodes and 3,395 `folder` nodes, with no key nothing is at, no wrong `file-extension`, no `page-type-slug` naming a page type that is not here or filed somewhere the file is not, and no `package` attribute disagreeing with the `package.json` beside it.

`rootsHere()` hands over `code-editor`, so the standing ruling that no code-editor node enters the graph rests on every caller passing the right repositories rather than on anything refusing them.

Every edge in akasha was measured on 2026-08-28: 250,239 edges, with no end that is no node, none reaching outside akasha, and no `contains` edge whose far end is not directly under its near one.

The `import` producer reads imports as TypeScript syntax rather than matching them as text, and its 32,892 edges agree exactly with the compiler's own scan of each of 11,225 files. Matching drew 50 that were specifiers inside a string, mostly generators writing import lines into what they emit.

All four edge producers answer what reaches a node. `contains` cuts the last segment off a key, `loader` swaps the attachment tail for the page one, `relation` reads the pages index, and `import` inverts the specifiers already held under `said/import/`, joined to paths by `oidsUnder` because 54 blob oids there are shared by 154 paths.

`graph/ask.ts` holds `HELD_ANSWERS`, which is what says a name is live. `sweep` reaches the marks under one name and nothing reached a name itself, so a name dropped from the code kept its answers forever; `forget` takes any name the list does not hold, and refuses to take anything when handed no names. The registered checks say the same for `outcome` and `keep`, against the whole registry rather than the set a run happens to use.

An outcome's mark is taken over the check's own code, and `entryOf` named a layout gone since the checks folder took its domain's name. `closureOf` reached nothing, so every check's mark was a hash of the kind, the slug and the runtime alone. The 14 registered checks now reach closures of 9 to 69 files. No check is cacheable today, so nothing was served stale; the mark stood still under checks that had not yet asked it to hold anything.

A cache read that cannot answer is a miss. Another run sweeping a stale mark takes a file away between the listing and the read, and a torn write leaves one that is not JSON; either threw where the caller could have worked the answer out.

A refusal is not kept against the context that got it. `into` is refused on a cold cache and the walk is what fills it, so keeping the refusal made every later ask in the run walk again for what the first walk had worked out: 100 asks cost 19.4s, and 37.7ms after.

What a run pays, measured 2026-08-28: 143ms for the path-to-oid map, 2ms for the marks, and 797ms for the first ask about a node over every kind, where the whole-repo maps are built from the answers already held. Every ask after is under half a millisecond, and a landing that moves a producer's own code makes that first ask 1.7s, being the walk which refills what it dropped.

`vocabulary` and `rows-homes` are held under a mark taken over the page shape and `CODE_DIRS`, which does not name `tools/`, where `rows-homes` is worked out. `astra-page-index` holds that one.

`cache/closure/closure.ts` holds the only transitive walk in the repository, written by hand because the graph answers one hop. It is what the last intent is aimed at.

`domain/the-graph` writes its Condition and its `Alan Approves` rule in the word "kind", which no domain defines. `domain/graph-producer` says "node type" and "edge type" for the same thing. Whether "kind" gives way to "type" everywhere is open; the intents here are settled case by case.

`page-type/graph-edge` defines an edge as "one link from one node to another", while every page under it describes an edge type rather than a link.

`page-type/graph-edge` states as a Condition that an edge runs from the node that names another to the one it names. `contains` runs against that: the child's key names the folder, and the edge runs from the folder.

Of the 124,768 relations the pages system reaches, 13 are dropped for naming a path no tracked file is at, all of them links; `links-resolve` is what reports those.

`edgesInto` does not walk for a producer that answers, so an `into` naming only part of what reaches a node makes the rest unreachable rather than slow. `Said` answers `held` with every answer under one name at the mark this run files under, or `null` where nothing is, and a producer inverting those owes `null` for any subject missing: `relation` on a drifted index, `import` on a cold cache. Each is walked when it does.

Every held answer is marked by the import closure of the file that works it out. `frontmatter` reaches 8 files, `import` 16 and `relation-links` 2, against 37 for `graph/ask.ts`, which every one of them was filed under before. A producer is no longer in any other's closure, so landing one drops none of the others' answers; the helpers they share are in both closures, so a change to one of those still drops both. An entry the graph does not reach falls back to the engine's closure, a mark that never moves being the one failure worth being over-eager about.
