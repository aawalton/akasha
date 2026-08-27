---
id: 9de7b6c5-fe35-59bc-9b4d-15b8c1e39a2c
page-type-slug: task
title: "Adopt capture reader contract"
slug: adopt-capture-reader-contract
domain-parent-slug: package/temper-shared-capture-host
required-reading-slugs:
  - page-type/task
---

# Definition

- **Adopt capture reader contract** — locking the capture part of a full addon to the one shape its host reads.

# Sequence

1. **The one declaration both sides derive from.**
   - **Alias** the addon's own writer types onto the shared core type, as a type-only export carrying no value. Skip this and the later check is a tautology: it locks the reader to a type only the reader uses, and catches nothing the writer does.
   - **Prove** the compiled Lua came out byte-identical. Any change in the bundle says a value import leaked in where a type-only one was meant.
   - **Expect** a type error here where the two declarations had already come apart. Meeting it at this stage rather than at the check is the point of aliasing first.

2. **The mirror, checked for equality.**
   - **Mirror** the capture part alone, never the whole saved-variables shape, and keep the container strict. A permissive container infers an extra open-ended key, and an equality check never matches that against the plain core type.
   - **Model** an optional field as optional inside the mirror, rather than by loosening the container.
   - **Check** the mirror against the now-shared core type, so a shape change that moves one side and not the other stops the compiler.

3. **The runtime parse, untouched.**
   - **Change** nothing in the host's parse at runtime. A full addon's parser is deliberately tolerant, and rejecting partial or older records would break what it takes in today.
   - **Leave** the in-game writer as it stands. Converting a working load handler to the framework's own buys nothing further, the equality check having already caught what would come apart.

# Invariants

- **A full addon takes the reader half and nothing else.** Its saved variables hold rules, profiles and progress the host never reads, so the writer half would take over a lifecycle that is not capture's to own.
