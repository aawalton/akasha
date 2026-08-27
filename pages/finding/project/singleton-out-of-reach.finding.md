---
id: eb0f5fce-e148-51c0-879a-ddce7bb30f63
slug: singleton-out-of-reach
page-type-slug: finding
title: "Singleton out of reach"
domain-slug: barred-meaning/project
---

# Claim

`singleton` reaches a seat booted on `domains/project.md` only inside the Landing Together rule, never as a definition. The domain declaring it, `domains/project-track.md`, is a descendant of this one, so the closure walk never reaches it. A boot composed for a seat stating `domain: project` runs 35,145 bytes with two hits for the word, both the rule, and none for its meaning.

# Evidence

Measured by a dispatched `review-instructions` seat on 2026-08-11 with `ops instructions compose-boot` against its own agent id, which states exactly that domain.

The reader's own recommendation was to leave it: "never as separate singletons" stands against "children of one parent" in the same sentence, and Plain Or Declared exempts a declared domain in its declared sense. A `glossary:` entry naming `project-track` would close it and would cost every reader of this domain at boot.

Not measured: whether any other term on this document is out of reach the same way.
