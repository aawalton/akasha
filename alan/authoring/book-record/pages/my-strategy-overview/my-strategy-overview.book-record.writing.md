# My Strategy — orientation

This book is where I work out what to improve next and why. It is not a product roadmap. As I put it in the first session: *"This isn't about what I'm trying to build. This is about improving my life."* The scope is my entire life, organised by my six values — faith, health, wealth, learn, love, fun — plus the work of getting better at improving anything at all. The domain now carries that as its definition: *how Alan improves his life with what he has to spend*.

## What is settled

**Two channels.** Improving my ability to make improvements, and using that ability to improve everything else. The first goes first because it compounds. The second reaches the six values mostly through code, because the prosthetics that compensate for total aphantasia, absent experiential memory and absent habit-formation have to be built. → [001](chapters/001-two-channels.md)

**Seven resources.** Time, attention, energy, stress capacity, money, Claude account usage, safety level. Scarcity in one does not change what I take on, only how slowly and at what cost. Safety level is also an output: it rises when the pipeline flows. → [002](chapters/002-resources.md)

**Two priority orderings.** Stability > Throughput > Functionality > Polish. Accelerate Improvement > Apply Improvement. Both stand in the `global` glossary in order. → [003](chapters/003-priorities.md)

**Eleven inboxes in two groups.** Active and clear: Defined Themes, Defined Initiatives, In Flight Projects, Direct Changes. Needing definition work: the seven from the Notion short list down through Findings. I pull rather than push: take what is closest to completion, finish it, pull forward. But the pull does no selecting; selection happens at the definition step, where an idea becomes a theme, initiative, project or direct change. → [004](chapters/004-inboxes.md)

**Change is a pipeline** of about 100 projects a day, with a nested sub-pipe per foundational layer. The milestone is that every layer's natural sub-pipe fits inside the whole with room to spare. Only agent-harness and code-harness are running. Agent-harness stability is the blocker — but it blocks only work depending on autonomous agents, not interactive work and not definition work. → [005](chapters/005-the-pipeline.md)

**I cap concurrency by hand, at two scales.** A child concurrency of three under one parent project, so a flooding workstream cannot destabilize everything else; and one session per persona, which — each persona owning one domain — is one line of change per area. Neither is recorded anywhere the system can read: both are held at the moment I start something. → [005](chapters/005-the-pipeline.md)

**The five layers are a dependency graph, not a sequence**, and they are numbered in dependency order. The domains/agent-harness tie is broken by bootstrap cost: domain-system is simple and interactive enough to start on a lighter harness. → [006](chapters/006-the-dependency-graph.md)

**Stability is prevention plus recoverability**, and they trade. On my workstation the code-repo machinery hurts recoverability to buy prevention that is not worth much there. → [007](chapters/007-stability.md)

**The delivery boundary.** Where a change is *delivered* decides which repository carries it — not what the code does, and not how careful I want to be about it. `ops` is the worked example: it drives deploys but is never deployed, so it does not belong in the code repo. Landed as the `delivery-boundary` theme with one objective, an Intent line on `global`, and a Design line on `instructions-repo`. → [008](chapters/008-when-code-runs-through-the-code-repo.md)

**And it is a reachability question, not a per-package judgement.** Code that runs in CI counts as deployed, because CI runs on the cluster; code reached only through a test does not, because *"a test is not a sufficient warrant for existence for code."* So the answer is the closure of the dependency graph out from everything that runs off this workstation, computed rather than argued. Project **#18789** is dispatched to build the two missing edges and print the complement. → [009](chapters/009-the-boundary-is-a-reachability-question.md)

## What is open

*Recorder's reading, marked.* This section is the recorder's. It lists what the pages record as unresolved, so a session does not spend itself re-deriving what is settled or assume what is not.

- **How the two priority orderings interact.** Nothing says what to do when Stability-first and Accelerate-Improvement-first point at different work.
- **The generalizable piece.** He noted in passing that a check earns its place when it costs less in delay than it saves in prevented failure, against a particular cost of failure. He stated it once and did not return to it. It is the reason the delivery boundary falls where it does, and it would decide the same question anywhere else — no other process has been read against it.
- **How the test-running CI step is treated.** The one case the reachability rule does not settle by itself, and it went out with project #18789 to be handed back rather than guessed. That step is a genuine cluster workload, so everything it touches is reachable; something has to say why that edge does not count, or the traversal returns the whole repository.
- **What moves out of `ops`.** The cluster reaches `ops` from two places, so the traversal will pull it into the code repo. His guess is that the part CI runs gets extracted; it is with athena-manager inside the agent-harness migration, and a guess is not yet a decision. → [009](chapters/009-the-boundary-is-a-reachability-question.md)
- **Two definitions written by inventory.** `code-repo` names the agent fleet, which by his own rule leaves it, and `instructions-repo` says "their tooling", which goes false the moment `ops` arrives. Both are owed a rewrite by boundary rather than by contents.
- **The three initiatives under `delivery-boundary`.** One each for the agent harness, the alan harness and `ops` — deliberately not opened in the session that set the objective. The alan-harness one is already with amy.
- **What the next most valuable stream is.** This is the question the book was opened to answer and it is still open in the form he asked it. His words: *"There is no single strategy for this, its complex, nuances, intuitive, and need puzzling out."* What the session produced instead is a redefinition of the question he accepted along the way — his own: *"what work in the five foundational layers would be most impactful and increasing the size of the total pipe?"* — and one piece of work against it, the alan-harness move now with amy. Whether that is the answer or only the first thing found is not recorded.

## How to work with me here

Two corrections I made about process in the first session, both of which stand:

> Okay, you're reaching into other places for content, rather than just asking me the question from the blank page, and I think that's the wrong approach here.

> This should be a collaborative interview, not just a rubber duck.

And the interviewer's habit of putting propositions to me for knock-down was removed outright: *"lets strip the claim concept out from this process entirely and focus just on conversational questions instead."*
