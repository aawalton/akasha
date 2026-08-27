---
id: 3e20a6ad-f398-5af3-a414-98d83e4557bd
page-type-slug: finding
title: "Workflow name declared twice"
domain-slug: domain/pages-system
---

# Claim

The `workflow` page type has its `name` key declared by two property documents at once, neither stating `narrows-slug`. Which one supplies the key is settled by whichever the resolver reaches, not by anything stated, so a reader cannot tell from the corpus whether `name` on a workflow is computed or free text.

# Evidence

`properties/page-name.md` declares `name` with `computed: true`. `properties/workflow-name.md` declares `name` with type `text`. Neither carries `narrows-slug:`, which is the key that would say one is a narrowing of the other rather than a rival declaration.

The two disagree on the thing that matters most about a key — whether a writer may set it. A computed key is derived and a `text` key is written, so a caller reading the wrong document writes a value that is either overwritten or silently authoritative, and both look identical at the call site.

Found by the seat re-keying CI from uuid to seq, while enumerating all fourteen declared `workflow` keys to prove that `pipeline` and `pipelineWorkflow` were not among them. It was not the subject of that work and was not acted on.

This is the fourth instance of the same class recorded against the pages system, after `colour-slug`, `publishedAt` and `notification.body`. Four instances is the finding: the shape recurs, so what is missing is a rule about when two documents may declare one key, rather than four separate repairs.
