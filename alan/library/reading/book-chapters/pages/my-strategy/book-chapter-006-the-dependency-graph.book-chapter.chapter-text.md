
# The dependency graph

> How work flows through Alan's five foundational layers, drawn out on 2026-08-11 as a dependency graph rather than a sequence. Records what each layer is used for in his own words, why the five are numbered (dependency order, with the domain-system/agent-harness tie broken by which can bootstrap on a lighter harness), and the two consequences he drew — why harness-in-instructions is critical, and a parallel initiative he could define for alan-harness.

> Lets talk about how work flows through the foundational layers and see what we can learn.

My first correction was to the shape:

> Okay, first corrections. The relationships are definitely more complex than a sequence. Lets see if we can draw out the dependency graph here.

## What each layer is used for

> The domain system defines itself and all of the other layers.

> The agent harness is used to update the domain system, the agent harness itself, as well as all other changes.

> The code harness is used only when changes are affecting the code repo.

> Infra has a small footprint on the shared workstation but primarily is used to run the code harness and the production apps and services.

> The alan harness gives me visibility into the five foundational layers (including itself), so that I can figure out where the next interventions should be.

Two of them are self-referential: the domain system defines itself, the agent harness updates itself, and the alan harness gives me visibility into itself. That is part of why this is a graph and not a line.

## Why they are numbered

> This is why the five foundational layerse are numbered. There is a fairly clear dependency order, with the domain system and agent harness both being essential for every change, but the domain system is simpler and more interactive, so it can bootstrap with a lighter harness, which breaks the tie.

So the numbering is a dependency order, and the only place it needed a tie broken was at the top: domain-system and agent-harness are both required for every change, and domain-system goes first because it is simple enough and interactive enough to get going on a lighter harness than the agent harness needs.

## What follows from it

> Yes, that's exactly why harness-in-instructions is critical, so much so that I'm having athena-lead implement the part of that initiative that moves the code that needs to be updated for stability into instructions first, and only then start working on the stability fixes.

> That also illustrates an additional thing I've been feeling which is the need for more of the alan-harness to exist outside of code as well, a parallel harness-in-instructions initiative for alan-harness, that's one I could define

---

*Recorder's reading, marked.* The ordering decision on this page is worth stating plainly because it is the kind of thing that reads as arbitrary later.

Four of the five layers order themselves by what uses what. Only the first two were genuinely tied — both are needed for every change, so neither depends on the other in the ordinary sense. The tie-breaker he used is not importance but **bootstrap cost**: whichever of the two can get running on less machinery goes first. That is a different criterion from the one ordering the rest of the list, and it is applied exactly once.

The sequencing decision on `harness-in-instructions` follows the same logic one level down. The stability fixes are the point of the work, but the code that needs fixing is moved into the instructions repository *first*, so that the fixes are then made somewhere they reach the fleet on a commit rather than a deploy. Fixing in place would have been faster and would have left the next fix exactly as slow.
