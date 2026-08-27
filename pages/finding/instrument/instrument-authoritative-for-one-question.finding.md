---
id: 41b0499e-7587-55b3-8e84-24dc7433532a
page-type-slug: finding
title: "Instrument authoritative for one question"
domain-slug: domain/instrument
---

# Claim

An instrument is authoritative for one question, and it is rarely the question being asked of it. A compiler answers assignability, not reachability; a test suite answers the draw, not the space; a grep answers your corpus, not the estate. Handing a decision to a mechanism reads as escaping judgment, which is exactly why nothing in the situation asks whether the mechanism was asked the right question — a judgment that announces itself gets scrutinised, one laundered through a machine does not.

# Evidence

Ruled 2026-07-28, standing only in `dirty/skills/agent-harness/rulings/measurement.md`, which is quarantined and queued for removal.

The specimen. A lead had to decide whether a code branch was dead. Rather than pick on judgment she ruled: narrow the parameter type and let the compiler decide — if it still compiles, the branch was unreachable. She recorded that as the reason the call was hers to rule rather than hers to prefer.

The compiler does not answer that question. It answers whether a value is assignable. Excess-property checking binds only fresh object literals, so a live call site passing a variable of the wider type compiles clean. The narrowed build went green with the branch DELETED, and the branch was live — driven twice on real seats hours earlier. Shipping the green formulation would have silently dropped operator text. The green branch of the decision procedure was the exact harm the procedure was written to prevent, and it was the cheaper formulation to try. Only running both caught it.

The remedy: before delegating a decision to any instrument, state the question that instrument is authoritative for and check it is the question you have. Where the delegation is load-bearing, run the formulation that would go RED as well as the one that would go green.

Its tell: if the answer arrives clean, cheap and confirming, ask what a wrong answer would have looked like. Here it would have looked identical — a clean build. That is the signature of a mechanism reporting on the neighbouring question: it does not fail, it succeeds about something else.

Live state checked 2026-08-07. `domains/instrument.md` carries Negative Control, Population and Horizon. Negative Control reaches the second half of the remedy. Nothing live reaches the first. `domains/instrument-population.md` draws the line the other way on purpose: "A population is what a run looked at, never the rules it checked them against."

The source carries two further faces of this shape and says they compose.
