---
id: 2aa7b782-ef62-543a-9685-10df0844e98b
page-type-slug: finding
title: "Standing instrument has no runner"
domain-slug: domain/instrument
---

# Claim

An instrument built to be re-run over standing data has no place in any process that runs it. `domains/check.md` covers code run on a change; `domains/instrument.md` defines an instrument as code kept to be run again, but names nobody who runs it and no occasion on which it runs. So an instrument outlives the project that built it and is thereafter invoked only when a person remembers to type it.

# Evidence

`monarch/amazon-pairs.ts` was built by #18169 to report a category divergence across a purchase and its refund. It works: on 2026-08-09 it found one, on a corpus its author never saw. Nothing runs it. It fires when a person types it, and the project that built it is closed.

The same holds for the 47 tests across `monarch/amazon-match.test.ts`, `monarch/amazon-pairs.test.ts` and `monarch/amazon-refund.test.ts`; `pages/finding/monarch/monarch-tests-run-by-nothing.finding.md` carries that half of it.

A project's checks stage runs an instrument once, against the criteria that project declared, and then the row closes. Nothing in the lifecycle asks whether the instrument should keep running afterwards. `domains/check.md`'s Change Reach principle separates an audit paid once over standing state from a check paid on every change forever — and the repeatedly-run audit is named by neither, so no document says whose job it is to run one.

#18168 and #18169 each raised a version of this in their own `# Notes` and both rows are now closed, which is the shape of the loss: the observation is made by whoever built the instrument, at the moment they can no longer act on it.
