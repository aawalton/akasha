---
id: 8b2946b1-8edc-5c14-aa17-6eb91010ceed
page-type-slug: finding
title: "Frozen render unreportable"
domain-slug: domain/global
---

# Claim

A readout whose rendering has stopped is indistinguishable from one that is current, so Alan can confirm a tile is showing today's numbers while looking at an image frozen days earlier.

# Evidence

Met on 2026-08-10. Alan installed TestFlight build 176 and reported his stoplight tiles unchanged. Hours of diagnosis later the shape came out: every widget he had NOT deleted and re-added was still drawing what the pre-176 binary had produced, and a freshly added one drew an empty face. The extension had stopped rendering, and the home screen went on showing its last successful images with nothing to say so.

`domains/readouts.md` covers the neighbouring case and not this one. It states that a readout keeps the last body it was given when its feed stops, and drops it when refused — which is about the BODY. `WidgetFeed.swift` implements exactly that, with `.neverLoaded`, `.refused` and `.unreachable` as distinct drawn states. None of it reaches a tile whose RENDERING has stopped, because then no code of ours runs at all: iOS serves the snapshot it holds, and every state designed to be visible sits behind the thing that is not running.

The cost was not staleness. It was that staleness could not be reported by the tile, so the only instrument left was Alan. Asked on 2026-08-10 whether his tiles showed current numbers he answered "Yes", and that closed criterion two of #18240. It was likely sound — the frozen images date from build 175 running behind the live gate, which is the state the criterion was about — but it was read off a frozen picture, and nothing available to him or to a seat could tell that from a live one.

`domains/readouts.md` also states that Alan is never the instrument that catches a readout being wrong. He was that instrument twice in one morning, and both times the tile looked plausible while being wrong.

What would separate the two is a mark that could only have been drawn recently. Whether that belongs on the tile, whose Design says a readout leaves out everything but the reading itself, or somewhere beside it, is a design decision rather than something this observation settles.
