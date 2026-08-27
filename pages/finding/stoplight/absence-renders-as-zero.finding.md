---
id: 99d7b2b7-6fdc-5c6e-b909-d77742e3b6eb
page-type-slug: finding
title: "Absence renders as zero"
domain-slug: domain/stoplight
---

# Claim

A stoplight circle that folds an absent reading into the same rendering as a real zero has no owner: the repair act was handed off to a project (#17539) that closed before taking it, and the live instance (the activity pillar, whose ingest has been dead since late July) has been rendering a confident zero throughout.

# Evidence

Project #17555, domain `stoplight`. Cut 2026-08-02 against initiatives/ambient-hud.md, for the one act the staleness principle most directly demands and that no row owns. Never defined: it carried only a capture, moved here from the row's retired `notes` attribute on 2026-08-15.

A pillar circle renders "Alan did nothing" when the truth is "nothing wrote." The activity circle is the live instance, its ingest dead since late July, rendering a confident zero throughout, but the shape is not specific to it: every stoplight that folds an absent reading into the same visual as a real zero has it, on both the widget half and the status bar.

Why homeless: #17551 is the diagnosis of the activity ingest and explicitly scopes the rendering question out, to "objective 2, recorded on #17539." #17539 is done. So the act was handed to a row that had already closed, and nothing has held it since.

Why not #17551's: repairing the writer and repairing the rendering are independent. The ingest could be fixed tomorrow and the next outage would render identically, or the rendering could be fixed and the pillar would correctly report itself empty while still empty. Folding them makes the second invisible the moment the first succeeds, the same trap #17554's define pass identified for the foreground write.

Why not ambient-hud's objective 2: that objective is about an element sitting at its constraint floor, a latency question. This is not: a zero rendered from no data is wrong at any latency, and would still be wrong on a surface that refreshed instantly.

The distinguishing question: what a circle should render when its input is absent rather than zero, given the two are the same number today and nothing downstream carries which one it is.

Not established: how many circles have this shape, or whether the absence is even representable in the payloads the surfaces read. Neither was surveyed.
