---
id: a15de416-6d75-5b67-9284-d56533dedfc7
page-type-slug: finding
title: "Unreached carrier silent zero"
domain-slug: domain/instrument
---

# Claim

An instrument that returns a clean zero for a carrier it cannot reach reads as a healthy result, so this population-declaring property is built correctly only where an author remembers to add it, instrument by instrument, with no construction yet making an unreached carrier unrepresentable as a silent zero.

# Evidence

Project #17173 (status someday_maybe, live-on deploy, domain `instrument`); notes captured 2026-08-15, no objective written.

Five present/absent instances found. An instrument declaring a population over some carrier returns a clean zero identically whether the carrier was checked and found empty, or the carrier could not be reached at all — the two cases are indistinguishable in the run, and a zero always reads as a healthy result rather than as a gap. This differs from a wrong count: the instrument is not lying about what it found, it never found anything to be wrong about.

Present: an instrument was built correctly and reaches its carrier — an author remembered, instrument by instrument, to add the reachability guarantee. Absent: an instrument shares the identical shape and purpose but its author did not add it, and nothing distinguishes the two from their output; both print a clean pass.

No single construction yet makes an unreached carrier unrepresentable as a silent zero — the property holds only where an author happened to add it. Adjacent to, but not merged with, the exemption-set population problem (#17246): that domain is about an exempting arm's zero being ambiguous between "rule withheld" and "nothing to withhold from"; this one is about a declaring instrument's zero being ambiguous between "checked, found none" and "never reached the carrier at all." Both are instances of a zero the run cannot distinguish from a gap, but the constructions differ and neither project subsumes the other.
