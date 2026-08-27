---
id: e27bd11b-0260-5750-9a94-33b84b4560f5
page-type-slug: finding
title: "Package edges carry a rule"
domain-slug: domain/browser
---

# Claim

Eight package documents name `browser` as a second parent alongside `code-repo`, and none of them is an area `browser` contains. Each holds server code as well as browser code, so the parent's stated area — "code that runs in the browser" — covers part of the child rather than the whole of it. The edge carries the `Directive Is Not The Boundary` rule down to those readers, which `domains/domain-parent.md` names as not a reason for an edge.

# Evidence

Read firsthand in `/var/home/walton/instructions` on 2026-08-10.

`domains/browser.md` declares `domain-parents: code`, and its Definition reads "code that runs in the browser." Its Design line reads "No glob names this area; a module is browser code by what it does, not by where it sits." Its Rules section holds one rule, `Directive Is Not The Boundary`.

The eight documents, each with `domain-parents:` listing `code-repo` then `browser`, and each with `domain-owner: code-repo`:

    domains/folders/alanwalton-web.md      packages/alanwalton/web/**
    domains/folders/archive-of-worlds.md   packages/archive-of-worlds/**
    domains/folders/atlas-app.md           packages/alanwalton/atlas/**
    domains/folders/audhdalan.md           packages/audhdalan/**
    domains/folders/design-system.md       packages/shared/design/**
    domains/folders/pages-ui.md            packages/shared/pages/ui/**
    domains/folders/smilingjenny.md        packages/smilingjenny/**
    domains/folders/temper-web.md          packages/temper/web/**

`domains/domain-parent.md` defines a domain parent as "a domain whose area contains another's", and two of its Design lines bear here: "A rule that needs reading below is not a reason for an edge" and "A layer a domain is built on is not a parent of it."

Each `code-path` names a whole package. `packages/alanwalton/web/**` holds the seven readout API routes verified answering 401 on 2026-08-10, which are server routes and run in no browser.

Not measured: what fraction of each package is browser code, and whether any of the eight is browser code end to end. Not measured: whether removing the edge would leave `Directive Is Not The Boundary` unreached by any seat writing in those packages, which is the cost of the repair and the likely reason the edge was drawn.

Noticed during the parent-edge audit of the 77 domains under `alan-harness` for objective two of `amy/defined-foundations`. These eight sit outside that set, under `code-repo`.
